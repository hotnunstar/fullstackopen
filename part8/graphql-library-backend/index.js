const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')

const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message)
	})

const typeDefs = `
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
		me: User
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ) : Book
        editAuthor(
            name: String!
            born: Int!
        ) : Author
		createUser(
    		username: String!
    		favoriteGenre: String!
  		): User
		login(
			username: String!
			password: String!
		): Token
    }
`

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),

		authorCount: async () => Author.collection.countDocuments(),

		allBooks: async (root, args) => {
			let query = {}

			if (args.genre) query.genres = { $in: [args.genre] }
			const books = await Book.find(query).populate('author')
			if (args.author) return books.filter((book) => book.author.name === args.author)

			return books
		},

		allAuthors: async () => {
			return Author.find({})
		},

		me: (root, args, context) => {
			return context.currentUser
		},
	},

	Author: {
		bookCount: async (root) => {
			return Book.countDocuments({ author: root._id })
		},
	},

	Mutation: {
		addBook: async (root, args, context) => {
			const session = await mongoose.startSession()
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			try {
				let book = null

				await session.withTransaction(async () => {
					let author = await Author.findOne({ name: args.author }).session(session)

					if (!author) {
						author = new Author({ name: args.author })
						await author.save({ session })
					}

					const existingBook = await Book.findOne({ title: args.title }).session(session)
					if (existingBook) {
						throw new GraphQLError('Title must be unique', {
							extensions: {
								code: 'BAD_BOOK_INPUT',
								invalidArgs: args.title,
							},
						})
					}

					book = new Book({ ...args, author: author._id })
					await book.save({ session })
				})

				const populatedBook = await Book.findById(book._id).populate('author')
				return populatedBook
			} catch (error) {
				let message = 'Saving author or book failed'
				if (error.name === 'ValidationError') {
					message += `: ${Object.values(error.errors)
						.map((e) => e.message)
						.join(', ')}`
				}

				throw new GraphQLError(message, {
					extensions: {
						code: 'BAD_BOOK_OR_AUTHOR_INPUT',
						invalidArgs: args,
						error,
					},
				})
			} finally {
				await session.endSession()
			}
		},

		editAuthor: async (root, args, context) => {
			const author = await Author.findOne({ name: args.name })
			author.born = args.born
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				})
			}

			try {
				await author.save()
			} catch (error) {
				throw new GraphQLError('Editing author born failed', {
					extensions: {
						code: 'BAD_AUTHOR_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			}

			return author
		},

		createUser: async (root, args) => {
			const user = new User({ ...args })

			return user.save().catch((error) => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				})
			})
		},

		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: { code: 'BAD_USER_INPUT' },
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
			const currentUser = await User.findById(decodedToken.id).populate('friends')
			return { currentUser }
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
