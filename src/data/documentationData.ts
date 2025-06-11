export interface DocumentationContent {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  notes?: string[];
  links?: { title: string; url: string }[];
}

export interface TroubleshootingItem {
  issue: string;
  solution: string;
  code?: string;
}

export interface DocumentationTopic {
  id: string;
  title: string;
  description: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeEstimate?: string;
  prerequisites?: string[];
  content: DocumentationContent[];
  troubleshooting?: TroubleshootingItem[];
}

export interface DocumentationSection {
  title: string;
  description: string;
  topics: DocumentationTopic[];
}

export const documentationData: Record<string, DocumentationSection> = {
  backend: {
    title: "Backend Development",
    description: "Server-side development, databases, and APIs",
    topics: [
      {
        "id": "basic-node.js-express.js-project-setup",
        "title": "Basic Node.js + Express.js with Database Config Project Setup",
        "description": "Supports both MongoDB and PostgreSQL (Sequelize)\nGet started with a dual-database ready Express server setup.",
        "difficulty": "beginner",
        "timeEstimate": "",
        "prerequisites": [
          "Sequelize ORM",
          "PostgreSQL",
          "body-parser",
          "cors",
          "dotenv",
          "http",
          "Node.js",
          "Express.js"
        ],
        "content": [
          {
            "title": "📁 Folder Structure",
            "description": "",
            "code": "project-root/\n├── config/\n│   └── db.ts                  # Sequelize & MongoDB config\n├── models/                    # Sequelize models\n├── routing/\n│   └── index.ts               # API route definitions\n├── utils/\n│   └── errorHandler.ts        # Centralized error middleware\n├── .env\n├── server.ts                  # Entry point\n└── package.json",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "1️⃣ Install Dependencies",
            "description": "",
            "code": "npm install express cors body-parser dotenv mongoose sequelize pg pg-hstore\nnpm install --save-dev typescript ts-node @types/express @types/node @types/cors",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "2️⃣ Configure .env",
            "description": "",
            "code": "PORT=4000\n\n# MongoDB\nMONGODB_URI=mongodb://localhost:27017/myapp\n\n# PostgreSQL\nDB_NAME=myapp\nDB_USER=postgres\nDB_PASS=yourpassword\nDB_HOST=localhost\nDB_PORT=5432",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "3️⃣ config/db.ts",
            "description": "",
            "code": "import mongoose from 'mongoose';\nimport { Sequelize } from 'sequelize';\nimport dotenv from 'dotenv';\n\ndotenv.config();\n\n// MongoDB connection\nexport const connectMongoDB = async () => {\n  try {\n    await mongoose.connect(process.env.MONGODB_URI || '');\n    console.log('✅ Connected to MongoDB');\n  } catch (err) {\n    console.error('❌ MongoDB Error:', err);\n  }\n};\n\n// Sequelize (PostgreSQL) connection\nexport const sequelize = new Sequelize(\n  process.env.DB_NAME || '',\n  process.env.DB_USER || '',\n  process.env.DB_PASS || '',\n  {\n    host: process.env.DB_HOST,\n    dialect: 'postgres',\n    port: Number(process.env.DB_PORT),\n    logging: false,\n  }\n);",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "4️⃣ routing/index.ts",
            "description": "",
            "code": "import { Router, Request, Response } from 'express';\n\nconst router = Router();\n\nrouter.get('/hello', (req: Request, res: Response) => {\n  res.status(200).json({ message: 'Hello world!' });\n});\n\nexport default router;",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "5️⃣ server.ts",
            "description": "",
            "code": "import express, { Request, Response, NextFunction } from 'express';\nimport http from 'http';\nimport cors from 'cors';\nimport bodyParser from 'body-parser';\nimport dotenv from 'dotenv';\nimport { connectMongoDB, sequelize } from './config/db';\nimport routing from './routing';\nimport errorHandler from './utils/errorHandler';\n\ndotenv.config();\n\nconst app = express();\nconst port = process.env.PORT || 4000;\n\napp.use(cors());\napp.use(bodyParser.json({ limit: '50mb' }));\napp.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));\n\n// Routing\napp.use('/api/v1', routing);\n\n// Error Handling\napp.use((err: Error, req: Request, res: Response, next: NextFunction) => {\n  errorHandler(err, req, res, next);\n});\n\n// Health Check\napp.get('/health', (req: Request, res: Response) => {\n  res.status(200).json({ status: 'UP' });\n});\n\n// Start Connections\n(async () => {\n  await connectMongoDB();\n\n  sequelize\n    .sync({ alter: true })\n    .then(() => console.log('✅ PostgreSQL Synced'))\n    .catch((err) => console.error('❌ PostgreSQL Sync Error:', err));\n\n  const server = http.createServer(app);\n  server.listen(port, () => {\n    console.log(`🚀 Server running on port ${port}`);\n  });\n})();",
            "language": "typescript",
            "notes": [],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "sequelize-basic-setup-and-commands",
        "title": "Sequelize Basic Setup and Commands",
        "description": "Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and SQL Server. It helps manage database interactions using JavaScript instead of raw SQL.",
        "difficulty": "beginner",
        "timeEstimate": "10-15 mins",
        "prerequisites": [
          "sequelize-cli",
          "pg",
          "pg-hstore",
          "mysql2",
          "Node.js"
        ],
        "content": [
          {
            "title": "1. Install Sequelize and Database Driver ",
            "description": "",
            "code": "npm install sequelize\n# For PostgreSQL\nnpm install pg pg-hstore\n# For MySQL\n# npm install mysql2",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "2. Initialize Sequelize Project (optional CLI)",
            "description": "This creates:\nproject/\n├── config/\n├── models/\n├── migrations/\n└── seeders/",
            "code": "npm install --save-dev sequelize-cli\nnpx sequelize-cli init",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "⚙️ Basic Configuration (config/config.json)",
            "description": "",
            "code": "{\n  development: {\n    username: \"your_db_user\",\n    password: \"your_db_password\",\n    database: \"your_db_name\",\n    host: \"127.0.0.1\",\n    dialect: \"postgres\"\n  },\n  ...\n}",
            "language": "json",
            "notes": [],
            "links": []
          },
          {
            "title": "📦 Connect to Database (Manual Setup)",
            "description": "",
            "code": "const { Sequelize } = require('sequelize');\n\nconst sequelize = new Sequelize('database', 'username', 'password', {\n  host: 'localhost',\n  dialect: 'postgres' // or 'mysql', 'sqlite', 'mssql'\n});",
            "language": "javascript",
            "notes": [
              "Not necessary if running Javascript with sequelize-cli commands."
            ],
            "links": []
          },
          {
            "title": "🔧 Generate a Model with Fields",
            "description": "✅ Creates a model file in models/ and a corresponding migration file in migrations/.",
            "code": "npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "🚀 Run Migrations (Create Tables)",
            "description": "✅ Executes all pending migrations and creates the corresponding tables in the database.",
            "code": "npx sequelize-cli db:migrate",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "↩️ Undo Last Migration",
            "description": "🔁 Rolls back the most recent migration only.",
            "code": "npx sequelize-cli db:migrate:undo",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "❌ Undo All Migrations",
            "description": "🔄 Rolls back all executed migrations, essentially cleaning up all tables created by Sequelize.",
            "code": "npx sequelize-cli db:migrate:undo:all",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "↩️ Undo Selective Migration using file name",
            "description": "🔁 Rolls back the specified migration file only.",
            "code": "npx sequelize-cli db:migrate:undo --name <migration_filename>.js",
            "language": "bash",
            "notes": [],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "error-handling-toolkit",
        "title": "Error Handling Toolkit",
        "description": "A centralized system for handling and managing errors across your Express + Sequelize ORM.\nIncludes a global error handler, custom error classes, and async wrapper functions to prevent repetitive try/catch blocks in controllers. Make your APIs robust, readable, and maintainable.\n\n",
        "difficulty": "advanced",
        "timeEstimate": "",
        "prerequisites": [],
        "content": [
          {
            "title": "🔥 errorHandler.ts",
            "description": "Global Express Error Middleware\nHandles all errors thrown in your routes, services, or utilities. Logs them for debugging and returns clean, consistent API responses without exposing sensitive internals.",
            "code": "import { Request, Response, NextFunction } from 'express';\nimport { AppError, systemFailureErrorMessage } from './error';\nimport { API_STATUS } from './constant';\n\nconst errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): Response => {\n    const errCode = (err as AppError).statusCode || 500;\n    const errMsg = err.message || systemFailureErrorMessage;\n\n    // Log the error for debugging\n    console.error(err);\n\n    // Return JSON response\n    return res.status(errCode).json({\n        status: API_STATUS.FAILURE,\n        message: errMsg\n    });\n};\n\nexport default errorHandler;",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "🛠 AppError Class",
            "description": "Custom Base Error Class\nExtends the native JavaScript Error with an HTTP status code. This is the foundation for all custom errors in the app.",
            "code": "/**\n * @fileoverview This file contains custom error classes and a base error class for the all module.\n * @module error\n */\n\n/**\n * Custom error class that extends the built-in Error class.\n * @class\n * @extends Error\n */\nclass AppError extends Error {\n    public statusCode: number;\n\n    /**\n     * Creates an instance of AppError.\n     * @param {string} message - The error message.\n     * @param {number} statusCode - The HTTP status code associated with the error.\n     */\n    constructor(message: string, statusCode: number) {\n        super(message);\n        this.statusCode = statusCode;\n        Error.captureStackTrace(this, this.constructor);\n    }\n}\n\n/**\n * Error message for system failure.\n * @type {string}\n */\nexport const systemFailureErrorMessage = \"We're experiencing some technical difficulties. Please try again in a few moments. If the issue continues, please reach out to our support team!\";\n\n/**\n * Custom error class for when Token is Invalid.\n * @class\n * @extends AppError\n */\nexport class InvalidToken extends AppError {\n    constructor() {\n        super('Forbidden: Invalid token', 403);\n    }\n}\n\n/**\n * Custom error class For server Error.\n * @class\n * @extends AppError\n */\nexport class ServerError extends AppError {\n    constructor() {\n        super('Server Error, Please try again after some time!', 400);\n    }\n}\n\n/**\n * Custom error class.\n * @class\n * @extends AppError\n */\nexport class CustomError extends AppError {\n    constructor(message: string, statusCode?: number) {\n        super(message, statusCode || 400);\n    }\n}\n\n/**\n * Custom error class.\n * @class\n * @extends AppError\n */\nexport class NotFound extends AppError {\n    constructor(message: string) {\n        super(`${message} Not Found!`, 404);\n    }\n}",
            "language": "typescript",
            "notes": [
              "You can create as many pre-defined errors as you can.",
              "and then you simply have to add \"throw new ServerError()\" and it'll automatically throw an error and stops execution."
            ],
            "links": []
          },
          {
            "title": "Index.ts or main file .js/.ts",
            "description": "put this code inside your main executable server file that runs backend.",
            "code": "// Custom error handling middleware for all routes\napp.use((err: Error, req: Request, res: Response, next: NextFunction) => {\n    errorHandler(err, req, res, next);\n});",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "🧵 asyncHandler & customReqAsyncHandler",
            "description": "Wrap your async routes — skip the boilerplate try/catch.\n\nHOW TO USE:-\n✅ asyncHandler\nStandard wrapper with typed Request.\n\nrouter.post(\"/login\", asyncHandler(authController.login));\n\n🔄 customReqAsyncHandler\nUsed when your req object is extended (e.g., for custom user tokens, roles).\n\nrouter.get(\"/profile\", customReqAsyncHandler(protectedController.getProfile));",
            "code": "import { Request, Response, NextFunction } from 'express';\n\nconst asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {\n    return (req: Request, res: Response, next: NextFunction) => {\n        Promise.resolve(fn(req, res, next)).catch(next);\n    };\n};\n\nconst customReqAsyncHandler = (fn: (req: any, res: Response, next: NextFunction) => Promise<any>) => {\n    return (req: any, res: Response, next: NextFunction) => {\n        Promise.resolve(fn(req, res, next)).catch(next);\n    };\n};\n\nexport { asyncHandler, customReqAsyncHandler };",
            "language": "typescript",
            "notes": [
              "These higher-order functions wrap async route handlers, automatically catching and passing any thrown errors to your global errorHandler, so you don’t have to repeat try...catch blocks in every controller."
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "backend-utils-for-node.js-express.js",
        "title": "Backend Utils for Node.js (Express.js)",
        "description": "A battle-tested toolkit of reusable utility functions for building clean, efficient, and scalable APIs with Express. Stop rewriting the same boilerplate – plug and play your logic like a pro.",
        "difficulty": "advanced",
        "timeEstimate": "",
        "prerequisites": [],
        "content": [
          {
            "title": "✅ validateRequiredFields(body, requiredFields)",
            "description": "Validates that all required fields in the request body are present and not empty. Throws a custom error with a human-readable message if any field is missing.",
            "code": "export const validateRequiredFields = async (body: Record<string, any> | null, requiredFields: string[]) => {\n    if (body) {\n        for (const field of requiredFields) {\n            if (!body[field] || body[field].toString().trim() === \"\") {\n                // Format the field name\n                const formattedField = field\n                    .replace(/_/g, \" \") // Replace underscores with spaces\n                    .replace(/id/gi, \"\") // Remove \"id\" (case-insensitive)\n                    .trim(); // Trim any extra spaces\n\n                throw new CustomError(`${formattedField} is required.`, 400);\n            }\n        }\n    }\n};",
            "language": "typescript",
            "notes": [
              "Prevent incomplete data submission in APIs."
            ],
            "links": []
          },
          {
            "title": "🧹 filterValidValues(obj)",
            "description": "Removes keys with undefined, null, or empty string values from an object.",
            "code": "/**\n * Filters out keys from an object with values that are undefined, null, or empty strings.\n * @param obj - The object to filter.\n * @returns A new object with only valid key-value pairs.\n */\nexport function filterValidValues<T extends Record<string, any>>(obj: T): Partial<T> {\n    return Object.fromEntries(\n        Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null && value !== \"\")\n    ) as Partial<T>;\n}",
            "language": "typescript",
            "notes": [
              "Cleaning up payloads before updating/inserting to the database."
            ],
            "links": []
          },
          {
            "title": "📞 validateAndFormatCountryCode(code)",
            "description": "Formats a phone country code to always start with +. Accepts both number and string input.",
            "code": "export function validateAndFormatCountryCode(code: string | number): string {\n    // Convert the input to a string if it's a number\n    const codeStr = typeof code === 'number' ? code.toString() : code;\n    let country_code = codeStr;\n\n    // Ensure the phone number starts with '+'; add it if missing\n    if (!codeStr.startsWith('+')) {\n        country_code = `+${codeStr}`;\n    }\n\n    // If valid, return the formatted country code\n    return country_code;\n}",
            "language": "typescript",
            "notes": [
              "Sanitize country codes for consistency across user profiles."
            ],
            "links": []
          },
          {
            "title": "🧪 parseFilters(req, filterParams)",
            "description": "Parses query parameters from Express req.query and converts comma-separated strings into arrays.",
            "code": "export const parseFilters = (req: any, filterParams: string[]) => {\n    const filters: Record<string, any> = {};\n    filterParams.forEach(param => {\n        if (typeof req.query[param] === \"string\") {\n            filters[param] = req.query[param].split(\",\");\n        } else if (typeof req.query[param] !== \"undefined\") {\n            filters[param] = req.query[param];\n        }\n    });\n    return filters;\n};",
            "language": "typescript",
            "notes": [
              "Build advanced filters for list or report APIs."
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "sequelize-reusable-utils",
        "title": "Sequelize Reusable Utils",
        "description": "A set of dynamic, plug-and-play utility functions for Sequelize that handle filtering, searching, sorting, and pagination with ease. Built to be reused across models, routes, and services — keeping your codebase DRY, clean, and scalable.",
        "difficulty": "advanced",
        "timeEstimate": "",
        "prerequisites": [],
        "content": [
          {
            "title": "🔍 applySearchCondition(condition, searchQuery, columns)",
            "description": "Adds a case-insensitive search filter using LIKE across multiple columns in Sequelize.",
            "code": "export const applySearchCondition = (condition: Record<string, any>, searchQuery: string, columns: string[]) => {\n    if (searchQuery) {\n        return {\n            ...condition,\n            [Op.or]: columns.map((column) =>\n                lowerCaseSearchCondition(column, searchQuery)\n            ),\n        };\n    }\n    return condition;\n};",
            "language": "typescript",
            "notes": [
              "Full-text search in admin panels or list views."
            ],
            "links": []
          },
          {
            "title": "🔠 lowerCaseSearchCondition(columnName, searchVal)",
            "description": "Helper used in applySearchCondition to apply a lowercase LIKE condition on a specific column.",
            "code": "// Function which will generate search condition with passed column name also search in lower case\nexport const lowerCaseSearchCondition = (columnName: string, searchVal: string) => {\n    return Sequelize.where(\n        Sequelize.fn('LOWER', Sequelize.cast(Sequelize.col(columnName), 'text')),\n        {\n            [Op.like]: `%${searchVal.toLocaleString().toLowerCase()}%`\n        }\n    );\n};",
            "language": "typescript",
            "notes": [
              "Ensure search queries are case-insensitive and accurate."
            ],
            "links": []
          },
          {
            "title": "📊 getSortOrder(sort, column, secondaryColumn?, secondarySort?)",
            "description": "Creates a Sequelize-compatible sort order array with optional secondary sorting.",
            "code": "// Get Sorting Order with Optional Secondary Column\nexport const getSortOrder = (\n    sort: string,\n    column: string,\n    secondaryColumn?: string,\n    secondarySort: \"ASC\" | \"DESC\" = \"DESC\"\n): [string | Col, \"ASC\" | \"DESC\"][] => {\n    const order: [string | Col, \"ASC\" | \"DESC\"][] = [[Sequelize.col(column), sort === \"ASC\" ? \"ASC\" : \"DESC\"]];\n\n    if (secondaryColumn) {\n        order.push([Sequelize.col(secondaryColumn), secondarySort]);\n    }\n\n    return order;\n};",
            "language": "typescript",
            "notes": [
              "Dynamic sorting in paginated tables or admin panels."
            ],
            "links": []
          },
          {
            "title": "🎯 constructFilters(filters, columnMapping, tableAlias?)",
            "description": "Generates a dynamic Sequelize where clause based on the provided filter keys and their mapped database columns. Also supports LIKE, IN, and direct equality.",
            "code": "/**\n * Construct a dynamic filter condition for Sequelize queries\n * @param filters - Object containing filters from request\n * @param columnMapping - Mapping of filter keys to database columns\n * @param tableAlias - Optional alias for tables to avoid conflicts in includes\n * @returns Sequelize `where` condition object\n */\nexport function constructFilters(\n    filters: Record<string, any>,\n    columnMapping: Record<string, string>,\n    tableAlias: Record<string, string> = {}\n) {\n    const conditions: Record<string, any> = {};\n\n    Object.keys(filters).forEach((key) => {\n        if (filters[key] !== undefined) {\n            const column = columnMapping[key] || key;\n            const alias = tableAlias[key] ? `${tableAlias[key]}.` : \"\";\n\n            if (Array.isArray(filters[key])) {\n                // If the filter value is an array, apply IN condition\n                conditions[`${alias}${column}`] = { [Op.in]: filters[key] };\n            } else if (typeof filters[key] === \"string\" && filters[key].includes(\"%\")) {\n                // If the filter value contains %, apply LIKE condition\n                conditions[`${alias}${column}`] = { [Op.like]: filters[key] };\n            } else {\n                // For direct equality\n                conditions[`${alias}${column}`] = filters[key];\n            }\n        }\n    });\n\n    return conditions;\n}",
            "language": "typescript",
            "notes": [
              "Flexible filter logic for tables, APIs, or dashboards."
            ],
            "links": []
          },
          {
            "title": "📦 paginate(model, { page, perPage }, queryOptions)",
            "description": "Purpose:\nPerforms a paginated fetch using Sequelize’s findAndCountAll and formats createdAt to IST (+05:30 timezone).\n\nReturns:\n{ total_items, data[] } object with paginated results.",
            "code": "import { ModelStatic, Model, WhereOptions, Attributes} from 'sequelize';\nimport moment from 'moment-timezone';\n\n// Define a type for the pagination options\ninterface PaginationOptions {\n    page: number;\n    perPage: number;\n}\n\n// Define a type for additional query options\nexport interface QueryOptions {\n    where?: WhereOptions<any>;\n    attributes?: Attributes<any>;\n    order?: [string, 'ASC' | 'DESC'][];\n    [key: string]: any;\n}\n\n// Define a type for Response\nexport interface ResponseType {\n    total_items?: number;\n    data?: any;\n}\n\n// Extend the generic type T to include createdAt and updatedAt\ninterface BaseModel extends Model {\n    createdAt?: Date;\n    updatedAt?: Date;\n}\n\nexport const paginate = async <T extends BaseModel>(\n    model: ModelStatic<T>,\n    options: PaginationOptions,\n    queryOptions: QueryOptions = {}\n) => {\n    const { page, perPage } = options;\n    const offset = (page - 1) * perPage;\n    const limit = perPage;\n\n    const data = await model.findAndCountAll({\n        ...queryOptions,\n        limit,\n        offset,\n    });\n\n    // Convert createdAt to +05:30 timezone if it exists\n    const transformedData = data.rows.map((row) => {\n        if (row.createdAt) {\n            row.createdAt = moment.tz(row.createdAt, 'Asia/Kolkata').toDate();\n        }\n        return row;\n    });\n\n    return {\n        total_items: data.count,\n        data: transformedData,\n    } as ResponseType;\n};",
            "language": "typescript",
            "notes": [
              "Standard pagination logic for any list API with timezone-aware timestamps."
            ],
            "links": []
          },
          {
            "title": "Smart Data Diff Utility for Selective Object Updates in TypeScript",
            "description": "This utility function, getUpdatedData, compares a set of specified object keys between an existing dataset and a new partial dataset. It normalizes string and numeric values to ensure accurate comparison (e.g. trimming, lowercasing, and type conversion), then uses Lodash’s _.isEqual for deep comparison. If changes are found in the specified fields, it returns an object containing only the updated fields; otherwise, it returns null. Useful for optimized updates in data-driven applications like forms, APIs, or state management.",
            "code": "import _ from 'lodash';\n\nexport const getUpdatedData = <T>(params: {\n    existingData: T;\n    newData: Partial<T>;\n    columnsToCompare: (keyof T)[];\n}): Partial<T> | null => {\n    const { existingData, newData, columnsToCompare } = params;\n\n    const updatedData: Partial<T> = {};\n\n    for (const column of columnsToCompare) {\n        const existingValue = existingData[column];\n        const newValue = newData[column];\n\n        let normalizedExistingValue: any = existingValue;\n        let normalizedNewValue: any = newValue;\n\n        // Normalize string and numeric values\n        if (typeof existingValue === 'string' && !isNaN(Number(existingValue))) {\n            normalizedExistingValue = Number(existingValue) as T[keyof T];\n        } else if (typeof existingValue === 'string') {\n            normalizedExistingValue = _.trim(existingValue).toLowerCase();\n        }\n\n        if (typeof newValue === 'string' && !isNaN(Number(newValue))) {\n            normalizedNewValue = Number(newValue) as T[keyof T];\n        } else if (typeof newValue === 'string') {\n            normalizedNewValue = _.trim(newValue).toLowerCase();\n        }\n\n        // Use Lodash's `_.isEqual` to compare normalized values\n        if (!_.isEqual(normalizedNewValue, normalizedExistingValue)) {\n            updatedData[column] = newValue!;\n        }\n    }\n\n    return Object.keys(updatedData).length > 0 ? updatedData : null;\n};",
            "language": "typescript",
            "notes": [],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "real-time-communication-with-socketio",
        "title": "Real-Time Communication with Socket.IO",
        "description": "This section provides a plug-and-play setup for integrating Socket.IO into your Node.js + Express backend. The implementation includes reusable socket configuration, event listeners, and a minimal example for backend to configure quickly with WebSocket-based communication.",
        "difficulty": "advanced",
        "timeEstimate": "60-90 mins",
        "prerequisites": [
          "Node.js",
          "Express.js",
          "Socket.IO"
        ],
        "content": [
          {
            "title": "✅ Step 1: Install Required Packages",
            "description": "",
            "code": "npm install socket.io",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ Step 2: Socket Configuration – socket/config.ts",
            "description": "",
            "code": "import { Server as HTTPServer } from 'http';\nimport { Server as SocketIOServer, Socket } from 'socket.io';\n\nlet io: SocketIOServer;\n\nexport const initializeSocket = (server: HTTPServer): SocketIOServer => {\n  io = new SocketIOServer(server, {\n    cors: {\n      origin: '*', // Allow all origins; restrict in production\n      methods: ['GET', 'POST'],\n    },\n  });\n\n  io.on('connection', (socket: Socket) => {\n    console.log(`🔌 User Connected: ${socket.id}`);\n\n    socket.on('disconnect', () => {\n      console.log(`❌ User Disconnected: ${socket.id}`);\n    });\n\n    // Example custom event\n    socket.on('sendMessage', (data) => {\n      console.log('📨 Received:', data);\n      io.emit('receiveMessage', data); // broadcast to all\n    });\n  });\n\n  return io;\n};\n\nexport const getIO = (): SocketIOServer => {\n  if (!io) {\n    throw new Error('Socket.io not initialized!');\n  }\n  return io;\n};",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ Step 3: Use in Main Server – server.ts",
            "description": "",
            "code": "import http from 'http';\nimport express from 'express';\nimport { initializeSocket } from './socket/config';\n\nconst app = express();\nconst server = http.createServer(app);\n\n// Socket.IO initialized\nexport const io = initializeSocket(server);\n\nserver.listen(4000, () => {\n  console.log('🚀 Server running on port 4000');\n});",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "📡 emitToUserWhenReady – Smart Socket.IO Emitter for Registered Users",
            "description": "This utility ensures that Socket.IO events are only emitted after a user is registered and has an active socket connection. It performs multiple retry attempts (default: 10) at fixed intervals (default: 100ms) until the client is ready. Ideal for situations where the server emits immediately after user login or action, but the socket connection on the client isn't yet established.\nIt improves reliability by avoiding lost events due to race conditions in socket registration timing.",
            "code": "import { io } from \"..\";\nimport { activeSockets, isRegistered } from \"./config\";\n\ntype EmitPayload = {\n    event: string;\n    data: any;\n    user_id: string;\n    retries?: number;\n    interval?: number;\n};\n\n/**\n * Waits until a user is registered and then emits a socket event.\n */\nexport const emitToUserWhenReady = async ({\n    event,\n    data,\n    user_id,\n    retries = 10,\n    interval = 100,\n}: EmitPayload): Promise<boolean> => {\n    if (!io) {\n        console.error(\"❌ Socket.IO instance not initialized\");\n        return false;\n    }\n\n    let attempts = retries;\n\n    while (attempts-- > 0) {\n        if (isRegistered[user_id] && activeSockets[user_id]) {\n            io.to(activeSockets[user_id]).emit(event, data);\n            console.log(`✅ Emitted \"${event}\" to ${user_id}`);\n            return true;\n        }\n\n        console.warn(`⏳ Waiting for user ${user_id} to register... (${retries - attempts}/${retries})`);\n        await new Promise((r) => setTimeout(r, interval));\n    }\n\n    console.error(\n        `❌ Failed to emit \"${event}\" — user ${user_id} not registered. \n         isRegistered: ${isRegistered[user_id]}, \n         activeSocket: ${activeSockets[user_id] || \"undefined\"}`\n    );\n    return false;\n};",
            "language": "typescript",
            "notes": [
              "How to Use:-",
              "await emitToUserWhenReady({event: \"notification\", data: { message: \"You have a new update!\" }, cli_user_id: \"user_123\", // must match what's registered from frontend });"
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "image-handler-utility-node.js-typescript",
        "title": "Image Handler Utility – Node.js (TypeScript)",
        "description": "This utility module provides a comprehensive toolkit for handling and processing image-related tasks in a Node.js backend built with TypeScript. It combines the power of ImageMagick, Sharp, and Axios to offer high-performance, flexible solutions for image conversion, compression, metadata extraction, and format transformations. The module includes intelligent logic for maintaining optimal file sizes, rotating images based on EXIF data, and retrying conversions on failure, making it production-ready for image-heavy applications.",
        "difficulty": "advanced",
        "timeEstimate": "",
        "prerequisites": [
          "image-size",
          "sharp",
          "fs",
          "ImageMagick",
          "child_process",
          "Node.js"
        ],
        "content": [
          {
            "title": "⚙️ Environment-Based Command",
            "description": "Returns the correct ImageMagick CLI command based on the environment.",
            "code": "function getConvertCommand() {\n    return NODE_ENV === 'local' ? 'magick' : 'convert';\n}",
            "language": "typescript",
            "notes": [
              "magick is required on Windows (usually for development).",
              "convert works for Linux/macOS (typically in production)."
            ],
            "links": []
          },
          {
            "title": "🔄 General Command Executor with Retry",
            "description": "Executes shell commands with built-in retry logic.",
            "code": "// Helper to execute a command and handle retries\nasync function executeCommand(command: string, retries: number = 3): Promise<void> {\n    return new Promise((resolve, reject) => {\n        const attempt = (retryCount: number) => {\n            exec(command, (error, stdout, stderr) => {\n                if (error) {\n                    console.error(`Conversion error: ${error.message}`);\n                    if (retryCount > 0) {\n                        console.log(`Retrying... Attempts left: ${retryCount}`);\n                        return attempt(retryCount - 1);\n                    }\n                    return reject(new Error(`Conversion failed after retries: ${stderr || error.message}`));\n                }\n                if (stderr) {\n                    console.error(`Conversion stderr: ${stderr}`);\n                }\n                console.log(`Conversion stdout: ${stdout}`);\n                resolve();\n            });\n        };\n\n        attempt(retries);\n    });\n}",
            "language": "typescript",
            "notes": [
              "📝 Use case: For critical operations like PDF/image conversion where failures are recoverable."
            ],
            "links": []
          },
          {
            "title": "📄 PDF to Image Conversion",
            "description": "Converts a multi-page or single-page PDF into an image using ImageMagick.",
            "code": "// Convert PDF to high-quality image using ImageMagick\nexport async function convertPdfToImage(pdfPath: string, imagePath: string) {\n    const convertKeyword = getConvertCommand();\n    const density = 200; // Reduced DPI for lower resolution\n    const quality = 40;  // Lower quality to reduce resource usage\n\n    const command = `${convertKeyword} -density ${density} -colorspace sRGB \"${pdfPath}\" -quality ${quality} \"${imagePath}\"`;\n\n    try {\n        await executeCommand(command, 3); // Retry up to 3 times\n        console.log(`PDF converted to image successfully: ${imagePath}`);\n    } catch (error: any) {\n        console.error(`Final conversion error: ${error.message}`);\n        throw error; // Rethrow error if all retries fail\n    }\n}",
            "language": "typescript",
            "notes": [
              "-density 200 improves quality.",
              "-quality 40 keeps image lightweight."
            ],
            "links": []
          },
          {
            "title": "📏 Fetch Rotated Image Dimensions",
            "description": "Fetches the dimensions of an image from a URL and corrects orientation based on EXIF metadata.",
            "code": "// Helper function to fetch image dimensions from URL\nexport const fetchImageDimensions = async (imageUrl: string) => {\n    try {\n        // Fetch the image buffer using axios\n        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });\n\n        // Process the image with sharp\n        const image = sharp(response.data);\n\n        // Rotate the image based on EXIF data (this will handle the auto-rotation)\n        const rotatedImage = image.rotate(); // Sharp will handle the rotation based on EXIF\n\n        // Get the metadata, including correct width and height after rotation\n        const metadata = await rotatedImage.metadata();\n\n        // Return the rotated dimensions\n        return {\n            width: metadata.width,\n            height: metadata.height\n        };\n    } catch (error) {\n        // console.error('Error fetching image dimensions:', error);\n        return { width: 0, height: 0 }; // Fallback if the image is not found\n    }\n};",
            "language": "typescript",
            "notes": [
              "axios to fetch image.",
              "sharp to auto-rotate and get metadata."
            ],
            "links": []
          },
          {
            "title": "🗜️ Image Compression with Smart Scale",
            "description": "Compresses an image (e.g., JPG, PNG) using a smart ratio system to reduce file size while preserving visual quality.",
            "code": "// Compress image using ImageMagick\nconst copyFile = promisify(fs.copyFile);\nconst execPromise = util.promisify(exec);\nconst MIN_FILE_SIZE = 200 * 1024; // 🔹 Minimum 200KB\nconst MAX_FILE_SIZE = 500 * 1024; // 🔹 Target Max 500KB\n\nexport async function compressImage(inputPath: string, outputPath: string) {\n    const convertKeyword = getConvertCommand();\n    let originalSize = fs.statSync(inputPath).size;\n\n    console.log(`🔍 Original size: ${(originalSize / 1024).toFixed(2)} KB`);\n\n    if (originalSize <= MAX_FILE_SIZE && originalSize >= MIN_FILE_SIZE) {\n        console.log(`✅ No compression needed for: ${outputPath}`);\n        await copyFile(inputPath, outputPath);\n        return;\n    }\n\n    // **Step 1: Calculate Initial Compression Ratio**\n    let targetCompressionRatio = MAX_FILE_SIZE / originalSize;\n    let quality = Math.round(100 * Math.pow(targetCompressionRatio, 0.5)); // Adjusted for better results\n    let scale = Math.round(100 * Math.sqrt(targetCompressionRatio));\n\n    quality = Math.min(85, Math.max(20, quality)); // Avoid too low/high quality\n    scale = Math.min(100, Math.max(50, scale)); // Avoid excessive scaling\n\n    console.log(`📏 Initial Quality: ${quality}%, Scale: ${scale}%`);\n\n    try {\n        let currentSize = originalSize;\n        let command;\n\n        // **Step 2: Apply Initial Compression**\n        command = `${convertKeyword} \"${inputPath}\" -resize ${scale}% -quality ${quality} -define webp:lossless=false \"${outputPath}\"`;\n        await executeCommandAll(command);\n        currentSize = fs.statSync(outputPath).size;\n        console.log(`✅ After Initial Compression: ${(currentSize / 1024).toFixed(2)} KB`);\n\n        // **Step 3: If Too Small, Undo Last Step**\n        if (currentSize < MIN_FILE_SIZE) {\n            console.log(`⚠️ Overcompressed! Reverting scale & increasing quality.`);\n            scale = Math.min(100, Math.round(scale * 1.2));\n            quality = Math.min(85, Math.round(quality * 1.2));\n\n            command = `${convertKeyword} \"${inputPath}\" -resize ${scale}% -quality ${quality} -define webp:lossless=false \"${outputPath}\"`;\n            await executeCommandAll(command);\n            currentSize = fs.statSync(outputPath).size;\n            console.log(`🔄 Adjusted Compression: ${(currentSize / 1024).toFixed(2)} KB`);\n        }\n\n        // **Step 4: If Still Too Large, Reduce Further**\n        while (currentSize > MAX_FILE_SIZE) {\n            scale = Math.max(50, Math.round(scale * 0.9));\n            quality = Math.max(20, Math.round(quality * 0.9));\n\n            command = `${convertKeyword} \"${outputPath}\" -resize ${scale}% -quality ${quality} -define webp:lossless=false \"${outputPath}\"`;\n            await executeCommandAll(command);\n\n            currentSize = fs.statSync(outputPath).size;\n            console.log(`🔄 Rescaled to ${scale}%, Quality ${quality}% - New Size: ${(currentSize / 1024).toFixed(2)} KB`);\n        }\n\n        console.log(`✅ Final Compressed Size: ${(currentSize / 1024).toFixed(2)} KB`);\n\n    } catch (error: any) {\n        console.error(`❌ Compression error: ${error.message}`);\n        throw error;\n    }\n}",
            "language": "typescript",
            "notes": [
              "Auto-adjusts quality and scale.",
              "Maintains between 200KB–500KB.",
              "Avoids under/over-compression with rollback logic."
            ],
            "links": []
          },
          {
            "title": "🔁 Convert to WebP",
            "description": "Converts images to optimized WebP format with lossless compression using ImageMagick.",
            "code": "export const convertToWebP = (inputPath: string, outputPath: string) => {\n    const convertKeyword = getConvertCommand();\n    if (!fs.existsSync(inputPath)) {\n        console.error(\"❌ ERROR: File not found before conversion:\", inputPath);\n        throw new Error(`File not found: ${inputPath}`);\n    }\n\n    console.log(\"✅ File exists, converting to WebP:\", inputPath);\n    const command = `${convertKeyword} \"${inputPath}\" -quality 100 -define webp:lossless=false \"${outputPath}\"`;\n\n    try {\n        execSync(command);\n    } catch (error) {\n        throw new Error(`ImageMagick conversion failed: ${error}`);\n    }\n};",
            "language": "typescript",
            "notes": [
              "Useful for web serving.",
              "File existence is validated before execution."
            ],
            "links": []
          },
          {
            "title": "🔗 Convert Image to Base64",
            "description": "Fetches and resizes an image from a URL, returning a Base64-encoded data:image/jpeg;base64,... string.",
            "code": "/**\n * Converts an image to Base64 format with resizing.\n * @param imageUrl - The URL of the image.\n * @param width - The desired width.\n * @param height - The desired height.\n * @returns Base64 string of the image.\n */\nexport const convertImageToBase64 = async (\n    imageUrl: string,\n    width: number,\n    height: number\n): Promise<string> => {\n    try {\n        // Fetch the image as a buffer\n        const response = await axios.get(imageUrl, { responseType: \"arraybuffer\" });\n        const imageBuffer = Buffer.from(response.data);\n\n        // Resize and convert to Base64\n        const resizedImageBuffer = await sharp(imageBuffer)\n            .resize(width, height) // Resize the image\n            .toFormat(\"jpeg\") // Convert to JPEG format\n            .toBuffer();\n\n        return `data:image/jpeg;base64,${resizedImageBuffer.toString(\"base64\")}`;\n    } catch (error) {\n        console.error(\"Error converting image to Base64:\", error);\n        return \"\";\n    }\n};",
            "language": "typescript",
            "notes": [
              "Embedding images in JSON/API responses.",
              "Lightweight image previews."
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        id: "nodejs-express-api",
        title: "Node.js Express REST API",
        description: "Build scalable REST APIs with Express.js and best practices",
        difficulty: "intermediate",
        timeEstimate: "45-60 mins",
        content: [
          {
            title: "1. Project Setup and Dependencies",
            code: `# Initialize project
npm init -y

# Install core dependencies
npm install express cors helmet morgan dotenv
npm install express-rate-limit express-validator
npm install mongoose bcryptjs jsonwebtoken

# Install development dependencies
npm install -D nodemon concurrently eslint prettier

# Create basic folder structure
mkdir src
mkdir src/routes src/models src/middleware src/controllers src/utils`,
            language: "bash"
          },
          {
            title: "2. Basic Express Server Setup",
            code: `// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;`,
            language: "javascript"
          },
          {
            title: "3. MongoDB Connection with Mongoose",
            code: `// src/config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

module.exports = connectDB;

// In your main app.js, add:
// const connectDB = require('./config/database');
// connectDB();`,
            language: "javascript"
          },
          {
            title: "4. User Model with Validation",
            code: `// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);`,
            language: "javascript"
          },
          {
            title: "5. Authentication Controller",
            code: `// src/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Register user
exports.register = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({ name, email, password });
    
    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};`,
            language: "javascript"
          },
          {
            title: "6. JWT Authentication Middleware",
            code: `// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Role-based authorization
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Please authenticate first' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions for this action' 
      });
    }

    next();
  };
};`,
            language: "javascript"
          }
        ]
      },
      {
        id: "database-config",
        title: "Database Configurations",
        description: "Setup and configuration for popular databases",
        difficulty: "intermediate",
        content: [
          {
            title: "MongoDB with Mongoose",
            code: `// Connection setup
const mongoose = require('mongoose');

// Basic connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // Disable mongoose buffering
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Environment-specific configurations
const dbConfig = {
  development: {
    uri: 'mongodb://localhost:27017/myapp_dev',
    options: { maxPoolSize: 5 }
  },
  test: {
    uri: 'mongodb://localhost:27017/myapp_test',
    options: { maxPoolSize: 2 }
  },
  production: {
    uri: process.env.MONGODB_URI,
    options: { 
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    }
  }
};`,
            language: "javascript"
          },
          {
            title: "PostgreSQL with Sequelize",
            code: `// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true // Soft deletes
    }
  }
);

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to PostgreSQL:', error);
  }
};

module.exports = { sequelize, testConnection };

// Example model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50]
    }
  }
});`,
            language: "javascript"
          },
          {
            title: "Redis Configuration",
            code: `// Redis setup for caching and sessions
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
  retry_strategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

// Cache middleware
const cache = (duration = 300) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    
    try {
      const cached = await redisClient.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      // Store original res.json
      const originalJson = res.json;
      res.json = function(data) {
        // Cache the response
        redisClient.setex(key, duration, JSON.stringify(data));
        originalJson.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Cache error:', error);
      next();
    }
  };
};

module.exports = { redisClient, cache };`,
            language: "javascript"
          }
        ]
      }
    ]
  },
  frontend: {
    title: "Frontend Development",
    description: "Client-side development, frameworks, and UI components",
    topics: [
      {
        "id": "react-best-practices",
        "title": "React.js Best Practices",
        "description": "Your no-nonsense cheat sheet for writing React like a pro — skip the Stack Overflow tabs.",
        "difficulty": "intermediate",
        "content": [
          {
            "title": "🚀 Project Setup & Structure",
            "code": "src/\n├── assets/           # Images, fonts, icons\n├── components/       # Reusable UI components\n├── hooks/            # Custom hooks\n├── pages/            # Page-level components (for routing)\n├── services/         # API calls, external services\n├── utils/            # Helper functions\n├── contexts/         # React Context providers\n├── store/            # Redux or Zustand logic\n├── types/            # TypeScript type definitions\n├── App.tsx\n├── index.tsx",
            "language": "bash",
            "notes": [
              "✅ Naming Conventions",
              "Components: PascalCase → ProductCard.tsx",
              "Hooks: useCamelCase → useAuth.ts",
              "Files & Folders: kebab-case or camelCase for utils, assets, etc."
            ]
          },
          {
            "title": "🧰 Common Tools & Libraries",
            "description": "",
            "code": "| Purpose          | Library                                    |\n| ---------------- | ------------------------------------------ |\n| State Management | `zustand`, `redux-toolkit`, `jotai`        |\n| Routing          | `react-router-dom`                         |\n| Forms            | `react-hook-form`, `formik`                |\n| API Handling     | `axios`, `fetch`, `tanstack/react-query`   |\n| Styling          | `tailwindcss`, `styled-components`, `sass` |\n| Animation        | `framer-motion`                            |\n| Testing          | `jest`, `react-testing-library`            |\n| Icon Packs       | `react-icons`, `lucide-react`              |",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ Component Design",
            "description": "Avoid anonymous functions in JSX",
            "code": "// ❌ Bad\n<button onClick={() => handleClick(id)}>Click</button>\n\n// ✅ Good\nconst handleClickId = () => handleClick(id);\n<button onClick={handleClickId}>Click</button>\n",
            "language": "typescript",
            "notes": [
              "Keep components small & reusable, If a component has too many responsibilities — split it.",
              "Use Presentational vs. Container pattern",
              "UI logic → presentational",
              "Data fetching/state → container"
            ],
            "links": []
          },
          {
            "title": "✅ State Management",
            "description": "",
            "code": "",
            "language": "bash",
            "notes": [
              "Prefer useState/useReducer for local component state.",
              "Use Context or zustand/redux for global state.",
              "Don’t overuse Context — it can trigger unnecessary re-renders."
            ],
            "links": []
          },
          {
            "title": "✅ File Imports",
            "description": "Use absolute imports instead of ../../../../../:\n\nand import like this:\nimport ProductCard from 'components/ProductCard';",
            "code": "// tsconfig.json\n{\n  \"compilerOptions\": {\n    \"baseUrl\": \"src\"\n  }\n}",
            "language": "json",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ ESLint + Prettier Setup",
            "description": "Add these dev dependencies:\nnpm i -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-import\n\n.eslintrc.js example:",
            "code": "module.exports = {\n  extends: ['react-app', 'plugin:react/recommended', 'prettier'],\n  plugins: ['react', 'import'],\n  rules: {\n    'react/prop-types': 'off',\n    'import/order': ['warn', { groups: [['builtin', 'external', 'internal']] }]\n  }\n};",
            "language": "javascript",
            "notes": [],
            "links": []
          }
        ]
      },
      {
        "id": "real-time-communication-with-socketio",
        "title": "Real-Time Communication with Socket.IO",
        "description": "This section provides a plug-and-play setup for integrating Socket.IO into your React.js + Typescript Frontend. The implementation includes reusable socket configuration, event listeners, and a minimal example for backend to configure quickly with WebSocket-based communication.",
        "difficulty": "advanced",
        "timeEstimate": "60-90 mins",
        "prerequisites": [
          "React.js",
          "Socket.IO Client"
        ],
        "content": [
          {
            "title": "✅ Step 1: Install Client Library",
            "description": "",
            "code": "npm install socket.io-client",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ Step 2: Create a socket.ts Helper",
            "description": "",
            "code": "// socket.ts\nimport { io, Socket } from 'socket.io-client';\n\nconst SOCKET_URL = 'http://localhost:4000'; // Replace with your backend URL\n\n// Define your custom socket event types (optional)\ninterface ServerToClientEvents {\n  receiveMessage: (data: { text: string }) => void;\n}\n\ninterface ClientToServerEvents {\n  sendMessage: (data: { text: string }) => void;\n}\n\nconst socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL);\n\nexport default socket;",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ Step 3: Use Socket in a React Component",
            "description": "",
            "code": "// ChatComponent.tsx\nimport React, { useEffect, useState } from 'react';\nimport socket from './socket';\n\ninterface Message {\n  text: string;\n}\n\nconst ChatComponent: React.FC = () => {\n  const [message, setMessage] = useState<string>('');\n  const [logs, setLogs] = useState<Message[]>([]);\n\n  useEffect(() => {\n    // Listen for messages from server\n    socket.on('receiveMessage', (data: Message) => {\n      setLogs((prevLogs) => [...prevLogs, data]);\n    });\n\n    // Cleanup on unmount\n    return () => {\n      socket.off('receiveMessage');\n    };\n  }, []);\n\n  const handleSend = () => {\n    if (message.trim()) {\n      socket.emit('sendMessage', { text: message });\n      setMessage('');\n    }\n  };\n\n  return (\n    <div>\n      <h3>Live Chat</h3>\n      <input\n        type=\"text\"\n        value={message}\n        onChange={(e) => setMessage(e.target.value)}\n        placeholder=\"Type your message...\"\n      />\n      <button onClick={handleSend}>Send</button>\n\n      <ul>\n        {logs.map((log, index) => (\n          <li key={index}>{log.text}</li>\n        ))}\n      </ul>\n    </div>\n  );\n};\n\nexport default ChatComponent;",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "🛠️ Notes",
            "description": "",
            "code": "",
            "language": "bash",
            "notes": [
              "socket.ts is reusable – you can import it in any component.",
              "You can extend ServerToClientEvents and ClientToServerEvents to strongly type your entire socket communication.",
              "Make sure your backend has CORS configured to accept requests from your frontend origin."
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "tailwind-css-setup-in-react-typescript-project",
        "title": "Tailwind CSS Setup in React + TypeScript Project",
        "description": "This guide helps you configure Tailwind CSS in a React app with TypeScript from scratch or within an existing project.",
        "difficulty": "intermediate",
        "timeEstimate": "10-15 mins",
        "prerequisites": [
          "tailwindcss",
          "autoprefixer",
          "React.js"
        ],
        "content": [
          {
            "title": "✅ Step 1: Install Tailwind CSS & Dependencies",
            "description": "Run the following command in your React project root:",
            "code": "npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p",
            "language": "bash",
            "notes": [
              "This creates:",
              "tailwind.config.js – Tailwind config file",
              "postcss.config.js – PostCSS plugin config"
            ],
            "links": []
          },
          {
            "title": "✅ Step 2: Configure tailwind.config.js",
            "description": "",
            "code": "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    \"./src/**/*.{js,ts,jsx,tsx}\", // Include all your TS/JSX files\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};",
            "language": "javascript",
            "notes": [
              "ℹ️ This ensures Tailwind scans your entire src directory for classes."
            ],
            "links": []
          },
          {
            "title": "✅ Step 3: Add Tailwind Directives to CSS",
            "description": "Create or edit src/index.css (or tailwind.css):",
            "code": "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
            "language": "css",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ Step 4: Import CSS in Your App",
            "description": "In src/index.tsx or src/main.tsx, import your Tailwind CSS:",
            "code": "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App';\nimport './index.css'; // Import Tailwind here\n\nconst root = ReactDOM.createRoot(document.getElementById('root')!);\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);",
            "language": "typescript",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ Step 5: Use Tailwind Classes in Your Components",
            "description": "",
            "code": "// ExampleComponent.tsx\nimport React from 'react';\n\nconst ExampleComponent: React.FC = () => {\n  return (\n    <div className=\"p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg\">\n      <h1 className=\"text-2xl font-bold mb-4\">Tailwind + TypeScript</h1>\n      <p>Style with utility classes like a pro ✨</p>\n    </div>\n  );\n};\n\nexport default ExampleComponent;",
            "language": "typescript",
            "notes": [],
            "links": []
          }
        ],
        "troubleshooting": []
      }
    ]
  },
  github: {
    title: "GitHub & CI/CD",
    description: "Version control, automation, and deployment workflows",
    topics: [
      {
        id: "greengeeks-shared-hosting",
        title: "GreenGeeks Shared Hosting CI/CD",
        description: "Complete CI/CD pipeline setup for GreenGeeks shared hosting with environment-specific deployments",
        difficulty: "advanced",
        timeEstimate: "30-60 mins",
        prerequisites: [
          "GreenGeeks shared hosting account with SSH access",
          "GitHub repository with proper branch structure (dev/main)",
          "Node.js application ready for deployment",
          "Understanding of GitHub Actions and environment variables"
        ],
        content: [
          {
            title: "1. Repository Setup and Branch Strategy",
            description: "Configure your repository with proper branch structure for staging and production",
            notes: [
              "Use 'dev' branch for staging environment deployments",
              "Use 'main' branch for production environment deployments",
              "Never commit sensitive data like passwords or API keys directly to repository",
              "Always test deployments on staging before pushing to production"
            ],
            code: `# Branch structure
main (production)
├── dev (staging)
├── feature/new-feature
└── hotfix/critical-fix

# Create and setup branches
git checkout -b dev
git push -u origin dev

# Environment files structure
├── .env.example
├── .env.dev (staging environment variables)
├── .env.main (production environment variables)
└── .github/workflows/deploy.yml`,
            language: "bash"
          },
          {
            title: "2. Backend Deployment Pipeline",
            description: "Complete GitHub Actions workflow for backend API deployment to GreenGeeks",
            code: `name: Deploy to GreenGeeks

on:
  push:
    branches:
      - dev
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set Deployment Variables
      run: |
        BRANCH_NAME=\${GITHUB_REF#refs/heads/}
        echo "BRANCH_NAME=\$BRANCH_NAME" >> \$GITHUB_ENV
        if [[ "\$BRANCH_NAME" == "dev" ]]; then
          echo "DEPLOY_PATH=public_html/api.dev.example.com" >> \$GITHUB_ENV
        else
          echo "DEPLOY_PATH=public_html/api.prod.example.com" >> \$GITHUB_ENV
        fi
        echo "Branch: \$BRANCH_NAME"
        echo "Deployment Path: \$DEPLOY_PATH"
  
    - name: Deploy to GreenGeeks Server
      uses: appleboy/ssh-action@v0.1.2
      with:
        host: \${{ secrets.HOST }}
        username: \${{ secrets.USERNAME }}
        password: \${{ secrets.PASSWORD }}
        script: |
            export DEPLOY_PATH="\${{ env.DEPLOY_PATH }}"
            export BRANCH="\${{ env.BRANCH_NAME }}"  # Use GitHub-provided branch name
            
            echo "Deploying branch: \$BRANCH"
            cd ~/\$DEPLOY_PATH || { echo "Error: Invalid DEPLOY_PATH: \${DEPLOY_PATH}"; exit 1; }
  
            if [ ! -d ".git" ]; then
              echo "Error: Not a Git repository in \${DEPLOY_PATH}!"
              exit 1
            fi
  
            # Secure Git Authentication
            git config --global credential.helper "store --file ~/.git-credentials"
            echo "https://\${{ secrets.USERNAME_GITHUB }}:\${{ secrets.TOKEN_GITHUB }}@github.com" > ~/.git-credentials
  
            # Ensure the branch exists remotely
            git fetch origin
            if git show-ref --verify --quiet refs/remotes/origin/\$BRANCH; then
              echo "Branch \$BRANCH exists on remote. Proceeding with pull..."
            else
              echo "Branch \$BRANCH does not exist on remote. Defaulting to main..."
              BRANCH="main"
            fi
  
            # Configure Git to avoid merge conflicts
            git config pull.rebase false  # Ensures a merge-based pull
            git config pull.ff only        # Only fast-forward if possible
  
            # Pull the correct branch, handling divergence properly
            git pull origin "\$BRANCH" || (git rebase origin/"\$BRANCH" && echo "Rebased successfully.")
  
            # Ensure Virtual Environment Exists
            if [ ! -d ~/nodevenv/\$DEPLOY_PATH/20 ]; then
              echo "Error: Virtual environment not found!"
              exit 1
            fi
  
            source ~/nodevenv/\$DEPLOY_PATH/20/bin/activate
            export PATH=\$PATH:~/nodevenv/\$DEPLOY_PATH/20/bin
  
            npm install
  
            # Restart the application
            touch ~/\$DEPLOY_PATH/tmp/restart.txt`,
            language: "yaml",
            notes: [
              "The workflow automatically detects the branch and sets appropriate deployment paths",
              "Virtual environment setup is crucial for Node.js applications on shared hosting",
              "The restart.txt file triggers application restart on GreenGeeks servers",
              "Git credentials are temporarily stored for authentication during deployment"
            ]
          },
          {
            title: "3. Frontend Deployment Pipeline",
            description: "GitHub Actions workflow for frontend application deployment with build process",
            code: `name: Deploy Frontend to GreenGeeks

on:
  push:
    branches:
      - dev
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set Deployment Variables
      run: |
        if [[ "\${GITHUB_REF}" == "refs/heads/dev" ]]; then
          echo "DEPLOY_PATH=public_html/app.dev.example.com/dev-repo-name" >> \$GITHUB_ENV
          echo "BRANCH=dev" >> \$GITHUB_ENV
        else
          echo "DEPLOY_PATH=public_html/app.example.com/prod-repo-name" >> \$GITHUB_ENV
          echo "BRANCH=main" >> \$GITHUB_ENV
        fi
        echo "Deploying branch: \${BRANCH} to \${DEPLOY_PATH}"

    - name: Deploy to GreenGeeks Server
      uses: appleboy/ssh-action@v0.1.2
      with:
        host: \${{ secrets.HOST }}
        username: \${{ secrets.USERNAME }}
        password: \${{ secrets.PASSWORD }}
        script: |
          export DEPLOY_PATH="\${{ env.DEPLOY_PATH }}"
          export BRANCH="\${{ env.BRANCH }}"

          cd ~/\${DEPLOY_PATH} || { echo "Error: Invalid DEPLOY_PATH: \${DEPLOY_PATH}"; exit 1; }

          # Ensure it's a Git repository
          if [ ! -d ".git" ]; then
            echo "Error: Not a Git repository in \${DEPLOY_PATH}!"
            exit 1
          fi

          # Secure Git Authentication
          git config --global credential.helper "store --file ~/.git-credentials"
          echo "https://\${{ secrets.USERNAME_GITHUB }}:\${{ secrets.TOKEN_GITHUB }}@github.com" > ~/.git-credentials

          # Fetch latest changes
          git fetch origin
          git checkout \${BRANCH}
          git pull origin \${BRANCH} || (git reset --hard origin/\${BRANCH} && echo "Force reset branch.")
          
          # Install dependencies and build
          npm install
          npm run build
          
          # Copy built files to deployment directory
          cp -r dist/* ../
          echo "✅ Deployment successful!"`,
            language: "yaml",
            notes: [
              "The frontend pipeline includes a build step before deployment",
              "Built files are copied to the parent directory for web serving",
              "Force reset is used as fallback if normal pull fails due to conflicts",
              "Environment-specific paths ensure staging and production isolation"
            ]
          },
          {
            title: "4. Environment Variables Configuration",
            description: "Setup environment-specific configuration files for different deployment environments",
            code: `# .env.dev (staging environment)
NODE_ENV=development
API_URL=https://api.dev.example.com
FRONTEND_URL=https://app.dev.example.com
DATABASE_URL=your_staging_database_url
JWT_SECRET=your_staging_jwt_secret
STRIPE_SECRET_KEY=sk_test_your_staging_stripe_key

# .env.main (production environment)
NODE_ENV=production
API_URL=https://api.prod.example.com
FRONTEND_URL=https://app.example.com
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_jwt_secret
STRIPE_SECRET_KEY=sk_live_your_production_stripe_key

# package.json scripts for conditional environment loading
{
  "scripts": {
    "dev": "node -r dotenv/config app.js dotenv_config_path=.env.dev",
    "start": "node -r dotenv/config app.js dotenv_config_path=.env.main",
    "build:dev": "NODE_ENV=development npm run build",
    "build:prod": "NODE_ENV=production npm run build"
  }
}`,
            language: "bash",
            notes: [
              "Use different environment files for staging and production",
              "Never commit actual .env files to repository - use .env.example instead",
              "Conditional script execution based on environment ensures proper configuration loading",
              "Always use test API keys and databases for staging environment"
            ]
          },
          {
            title: "5. GitHub Secrets Configuration",
            description: "Required secrets for successful deployment automation",
            code: `# Required GitHub Secrets (Repository Settings > Secrets and variables > Actions)

HOST=your-greengeeks-server-hostname
USERNAME=your-cpanel-username
PASSWORD=your-cpanel-password
USERNAME_GITHUB=your-github-username
TOKEN_GITHUB=your-github-personal-access-token

# To create GitHub Personal Access Token:
# 1. Go to GitHub Settings > Developer settings > Personal access tokens
# 2. Generate new token with 'repo' scope
# 3. Copy the token and add it to GitHub secrets

# SSH Connection Test (run locally to verify)
ssh your-username@your-greengeeks-host
# If successful, your credentials are correct`,
            language: "bash",
            notes: [
              "Personal Access Token must have 'repo' scope for private repositories",
              "Test SSH connection manually before setting up automation",
              "Store all sensitive data in GitHub Secrets, never in code",
              "Use different credentials for staging and production if possible"
            ]
          },
          {
            title: "6. GreenGeeks Server Preparation",
            description: "Initial server setup and directory structure for automated deployments",
            code: `# SSH into your GreenGeeks server
ssh your-username@your-greengeeks-host

# Create directory structure
mkdir -p public_html/api.dev.example.com
mkdir -p public_html/api.prod.example.com
mkdir -p public_html/app.dev.example.com/dev-repo-name
mkdir -p public_html/app.example.com/prod-repo-name

# Clone repositories to appropriate directories
cd public_html/api.dev.example.com
git clone -b dev https://github.com/yourusername/your-backend-repo.git .

cd ../api.prod.example.com
git clone -b main https://github.com/yourusername/your-backend-repo.git .

cd ../app.dev.example.com/dev-repo-name
git clone -b dev https://github.com/yourusername/your-frontend-repo.git .

cd ../../app.example.com/prod-repo-name
git clone -b main https://github.com/yourusername/your-frontend-repo.git .

# Setup Node.js environment (if not already done)
# GreenGeeks usually provides Node.js setup through cPanel
# Create virtual environment for each application
cd ~/public_html/api.dev.example.com
npm install

cd ../api.prod.example.com
npm install`,
            language: "bash",
            notes: [
              "Directory structure must match the paths defined in GitHub Actions",
              "Clone appropriate branches to respective directories",
              "Install dependencies initially to ensure everything works",
              "Verify Node.js version compatibility with your application"
            ]
          }
        ],
        troubleshooting: [
          {
            issue: "SSH connection fails during GitHub Actions",
            solution: "Verify that SSH credentials are correct and the server allows SSH access. Check if your IP is whitelisted in GreenGeeks security settings.",
            code: `# Test SSH connection manually
ssh -v your-username@your-greengeeks-host

# Check GitHub secrets are properly set
# Go to Repository > Settings > Secrets and variables > Actions`
          },
          {
            issue: "Git authentication fails on server",
            solution: "Ensure GitHub Personal Access Token has proper permissions and hasn't expired. Regenerate token if necessary.",
            code: `# On server, test git access manually
git clone https://username:token@github.com/yourusername/repo.git

# Clear cached credentials if needed
git config --global --unset credential.helper`
          },
          {
            issue: "Node.js application fails to start after deployment",
            solution: "Check if all environment variables are properly set and virtual environment is activated. Verify Node.js version compatibility.",
            code: `# Check application logs
cd ~/public_html/your-app-directory
tail -f tmp/log

# Verify environment variables
source ~/nodevenv/public_html/your-app/20/bin/activate
node -e "console.log(process.env.NODE_ENV)"`
          },
          {
            issue: "Build files not copying correctly in frontend deployment",
            solution: "Ensure the build process completes successfully and dist directory exists before copying files.",
            code: `# Manual build test on server
npm run build
ls -la dist/

# Check if parent directory has proper permissions
ls -la ../`
          }
        ]
      },
      {
        id: "git-commands",
        title: "Essential Git Commands",
        description: "Most commonly used Git commands for daily development",
        difficulty: "beginner",
        content: [
          {
            title: "Basic Git Operations",
            code: `# Initialize repository
git init

# Clone repository
git clone <repository-url>

# Check status
git status

# Add files to staging
git add .
git add <file-name>

# Commit changes
git commit -m "commit message"

# Push to remote
git push origin main

# Pull latest changes
git pull origin main

# Check commit history
git log --oneline`,
            language: "bash"
          },
          {
            title: "Branch Management",
            code: `# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git switch main

# List branches
git branch
git branch -r  # remote branches

# Merge branch
git checkout main
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature`,
            language: "bash"
          },
          {
            title: "Undoing Changes",
            code: `# Unstage file
git reset HEAD <file>

# Discard local changes
git checkout -- <file>

# Reset to previous commit
git reset --hard HEAD~1

# Revert commit (safe for shared repos)
git revert <commit-hash>

# Stash changes
git stash
git stash pop
git stash list`,
            language: "bash"
          }
        ]
      },
      {
        id: "github-actions-cicd",
        title: "GitHub Actions CI/CD Pipeline",
        description: "Automated testing, building, and deployment workflows",
        difficulty: "intermediate",
        timeEstimate: "25-40 mins",
        content: [
          {
            title: "1. Basic Node.js CI Workflow",
            description: "Automated testing and building for Node.js applications",
            code: `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info`,
            language: "yaml"
          },
          {
            title: "2. Deploy to AWS EC2",
            description: "Automated deployment to EC2 instance",
            code: `  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to EC2
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: \${{ secrets.EC2_HOST }}
        username: \${{ secrets.EC2_USERNAME }}
        key: \${{ secrets.EC2_SSH_KEY }}
        script: |
          cd /home/ubuntu/your-app
          git pull origin main
          npm install --production
          pm2 restart your-app
          pm2 save`,
            language: "yaml",
            notes: [
              "Add EC2_HOST, EC2_USERNAME, and EC2_SSH_KEY to GitHub Secrets",
              "Ensure your EC2 instance has git configured and your app directory exists"
            ]
          },
          {
            title: "3. Docker Build and Push",
            description: "Build Docker images and push to registry",
            code: `  docker:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: \${{ secrets.DOCKERHUB_USERNAME }}
        password: \${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          yourusername/your-app:latest
          yourusername/your-app:\${{ github.sha }}
        cache-from: type=gha
        cache-to: type=gha,mode=max`,
            language: "yaml"
          },
          {
            title: "4. Environment-based Deployment",
            description: "Deploy to different environments based on branch",
            code: `name: Environment Deployment

on:
  push:
    branches: [ main, staging, develop ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set environment variables
      run: |
        if [[ \${{ github.ref }} == 'refs/heads/main' ]]; then
          echo "ENVIRONMENT=production" >> \$GITHUB_ENV
          echo "SERVER_HOST=\${{ secrets.PROD_HOST }}" >> \$GITHUB_ENV
        elif [[ \${{ github.ref }} == 'refs/heads/staging' ]]; then
          echo "ENVIRONMENT=staging" >> \$GITHUB_ENV
          echo "SERVER_HOST=\${{ secrets.STAGING_HOST }}" >> \$GITHUB_ENV
        else
          echo "ENVIRONMENT=development" >> \$GITHUB_ENV
          echo "SERVER_HOST=\${{ secrets.DEV_HOST }}" >> \$GITHUB_ENV
        fi
    
    - name: Deploy to \${{ env.ENVIRONMENT }}
      run: |
        echo "Deploying to \${{ env.ENVIRONMENT }} environment"
        # Add your deployment commands here`,
            language: "yaml"
          }
        ],
        troubleshooting: [
          {
            issue: "GitHub Actions workflow not triggering",
            solution: "Check if the workflow file is in .github/workflows/ directory and has correct YAML syntax",
            code: `# Validate YAML syntax
yamllint .github/workflows/ci.yml

# Check workflow runs in GitHub UI
# Go to Actions tab in your repository`
          }
        ]
      }
    ]
  },
  devops: {
    title: "DevOps",
    description: "Deployment, infrastructure, and automation guides",
    topics: [
      {
        id: "aws-ec2-deployment",
        title: "Deploy Node.js App to AWS EC2",
        description: "Complete guide to deploy a Node.js application on AWS EC2 instance",
        difficulty: "intermediate",
        timeEstimate: "30-45 mins",
        prerequisites: [
          "AWS Account with EC2 access",
          "Basic Linux/Ubuntu knowledge",
          "Node.js application ready for deployment"
        ],
        content: [
          {
            title: "1. Launch EC2 Instance",
            description: "Create and configure an EC2 instance",
            code: `# Connect to your EC2 instance
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

# Update the system
sudo apt update && sudo apt upgrade -y`,
            language: "bash",
            notes: [
              "Make sure your security group allows SSH (port 22) and HTTP (port 80/443)",
              "Keep your .pem file secure and set proper permissions: chmod 400 your-key.pem"
            ]
          },
          {
            title: "2. Install Node.js and npm",
            description: "Install Node.js using NodeSource repository",
            code: `# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally for process management
sudo npm install -g pm2`,
            language: "bash"
          },
          {
            title: "3. Clone and Setup Your Application",
            description: "Get your code and install dependencies",
            code: `# Clone your repository
git clone https://github.com/yourusername/your-app.git
cd your-app

# Install dependencies
npm install

# Create production environment file
sudo nano .env

# Example .env content:
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret`,
            language: "bash"
          },
          {
            title: "4. Configure Nginx as Reverse Proxy",
            description: "Setup Nginx to serve your application",
            code: `# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/your-app

# Nginx configuration content:
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable the site
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx`,
            language: "nginx"
          },
          {
            title: "5. Start Application with PM2",
            description: "Run your app in production mode with PM2",
            code: `# Start your application
pm2 start npm --name "your-app" -- start

# Or if you have a specific entry point:
pm2 start app.js --name "your-app"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu

# Check application status
pm2 status
pm2 logs your-app`,
            language: "bash"
          },
          {
            title: "6. Setup SSL with Let's Encrypt (Optional)",
            description: "Secure your application with free SSL certificate",
            code: `# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run`,
            language: "bash"
          }
        ],
        troubleshooting: [
          {
            issue: "Application not accessible from browser",
            solution: "Check if the security group allows inbound traffic on port 80/443",
            code: `# Check if your app is running
curl localhost:3000

# Check Nginx status
sudo systemctl status nginx

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log`
          },
          {
            issue: "PM2 process keeps crashing",
            solution: "Check application logs and ensure all environment variables are set",
            code: `# Check PM2 logs
pm2 logs your-app

# Restart the application
pm2 restart your-app

# Check environment variables
pm2 env your-app`
          }
        ]
      },
      {
        "id": "deploy-postgresql-database-on-aws-ec2",
        "title": "Deploy PostgreSQL Database on AWS EC2",
        "description": "A step-by-step guide to install and configure PostgreSQL on an Amazon EC2 instance for remote access and development.",
        "difficulty": "intermediate",
        "timeEstimate": "",
        "prerequisites": [
          "AWS account",
          "EC2 instance (Ubuntu recommended)",
          "SSH access to EC2",
          "Security Group open on port 5432 (PostgreSQL default)"
        ],
        "content": [
          {
            "title": "✅ 1. Connect to EC2 via SSH",
            "description": "",
            "code": "ssh -i your-key.pem ubuntu@your-ec2-public-ip",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ 2. Update System & Install PostgreSQL",
            "description": "",
            "code": "sudo apt update && sudo apt upgrade -y\nsudo apt install postgresql postgresql-contrib -y",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ 3. Switch to postgres User",
            "description": "",
            "code": "sudo -i -u postgres",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ 4. Open PostgreSQL Shell",
            "description": "",
            "code": "psql",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ 5. Create User and Database",
            "description": "",
            "code": "CREATE USER your_user WITH PASSWORD 'your_password';\nCREATE DATABASE your_db;\nGRANT ALL PRIVILEGES ON DATABASE your_db TO your_user;\n\\q",
            "language": "sql",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ 6. Allow Remote Connections",
            "description": "Edit postgresql.conf:- \nUncomment and change:- \n[listen_addresses = '*']",
            "code": "sudo nano /etc/postgresql/<version>/main/postgresql.conf",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ 7. Configure Client Authentication",
            "description": "Edit pg_hba.conf:- \nAdd this line at the end (for any IP or restrict to specific):-\n[host    all             all             0.0.0.0/0               md5]",
            "code": "sudo nano /etc/postgresql/<version>/main/pg_hba.conf",
            "language": "bash",
            "notes": [
              "🔒 Replace 0.0.0.0/0 with your IP range for better security."
            ],
            "links": []
          },
          {
            "title": "✅ 8. Restart PostgreSQL",
            "description": "",
            "code": "sudo systemctl restart postgresql",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✅ 9. Open Port 5432 in EC2 Security Group",
            "description": "Go to EC2 > Security Groups\nEdit Inbound Rules",
            "code": "",
            "language": "bash",
            "notes": [
              "Add rule:",
              "Type: PostgreSQL",
              "Port: 5432",
              "Source: 0.0.0.0/0 (or your IP range)"
            ],
            "links": []
          },
          {
            "title": "✅ 10. Connect Remotely from PGAdmin or App",
            "description": "Use the following credentials:",
            "code": "Host:     <your-ec2-public-ip>\nPort:     5432\nDatabase: your_db\nUsername: your_user\nPassword: your_password",
            "language": "bash",
            "notes": [
              "Avoid using 0.0.0.0/0 for production — restrict access to known IPs.",
              "Use strong passwords.",
              "Consider setting up a firewall (UFW) or using SSH tunneling for secure connections."
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        id: "docker-deployment",
        title: "Docker Containerization",
        description: "Containerize applications with Docker for consistent deployments",
        difficulty: "intermediate",
        timeEstimate: "20-30 mins",
        content: [
          {
            title: "1. Create Dockerfile",
            description: "Basic Dockerfile for Node.js application",
            code: `# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Start application
CMD ["npm", "start"]`,
            language: "dockerfile"
          },
          {
            title: "2. Docker Compose Setup",
            description: "Multi-container setup with database",
            code: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongo:27017/myapp
    depends_on:
      - mongo
    networks:
      - app-network

  mongo:
    image: mongo:5.0
    restart: always
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
    networks:
      - app-network

volumes:
  mongo-data:

networks:
  app-network:
    driver: bridge`,
            language: "yaml"
          },
          {
            title: "3. Build and Run Commands",
            description: "Essential Docker commands for deployment",
            code: `# Build the image
docker build -t my-app .

# Run single container
docker run -d -p 3000:3000 --name my-app-container my-app

# Using Docker Compose
docker-compose up -d

# View logs
docker logs my-app-container
docker-compose logs app

# Stop and remove
docker stop my-app-container
docker rm my-app-container
docker-compose down

# Clean up unused images
docker system prune -a`,
            language: "bash"
          }
        ]
      }
    ]
  },
  shell: {
    title: "Shell Scripting",
    description: "Essential shell scripts for automation and deployment",
    topics: [
      {
        "id": "efficient-image-compression-and-optimization-script-using-powershell-imagemagick",
        "title": "Efficient Image Compression and Optimization Script Using PowerShell & ImageMagick",
        "description": "This PowerShell script automates the process of compressing and resizing images within a specified size range (600–900KB) using ImageMagick. It supports various formats like JPG, JPEG, PNG, and WEBP, and smartly adjusts compression quality and scale in a loop to achieve the desired file size without compromising too much on image quality.",
        "difficulty": "intermediate",
        "timeEstimate": "",
        "prerequisites": [
          "Windows PowerShell",
          "ImageMagick installed",
          "magick"
        ],
        "content": [
          {
            "title": "✅ create \"Compress-Images.ps1\" file",
            "description": "run command to execute script: \"./Compress-Images.ps1\"",
            "code": "# Input and Output folders (can be the same)\n$InputFolder = \"D:\\Downloads\\Test1\"\n$OutputFolder = \"D:\\Downloads\\Test2\"\n\n# Ensure ImageMagick is installed\n$magickPath = (Get-Command magick -ErrorAction SilentlyContinue).Source\nif (-not $magickPath) {\n    Write-Host \"❌ ImageMagick is not installed. Please install it from: https://imagemagick.org/\"\n    exit\n}\n\n# Target size range (600–900KB)\n$MinSize = 600 * 1024\n$MaxSize = 900 * 1024\n\n# Supported extensions\n$extensions = @(\"*.jpg\", \"*.jpeg\", \"*.png\", \"*.webp\")\n\n# Get all matching files\n$files = Get-ChildItem -Path $InputFolder -Recurse -File -Include $extensions\n\nforeach ($file in $files) {\n    $inputPath = $file.FullName\n    $relativePath = $inputPath.Substring($InputFolder.Length).TrimStart('\\')\n    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)\n    $outputFolderPath = [System.IO.Path]::GetDirectoryName($file.FullName)\n    $outputPath = Join-Path $outputFolderPath \"$baseName.webp\"\n\n    # Skip if output file already exists and is within size range\n    if (Test-Path $outputPath) {\n        $existingSize = (Get-Item $outputPath).Length\n        if ($existingSize -ge $MinSize -and $existingSize -le $MaxSize) {\n            Write-Host \"✅ Already optimized: $outputPath\"\n            continue\n        }\n    }\n\n    $quality = 85\n    $scale = 100\n    $compressed = $false\n\n    for ($i = 0; $i -lt 5; $i++) {\n        Write-Host \"🔄 Compressing: $relativePath | Quality: $quality% | Scale: $scale%\"\n\n        # Compress with webp output\n        magick \"$inputPath\" -resize \"$scale%\" -quality $quality -define webp:method=6 \"$outputPath\"\n\n        $finalSize = (Get-Item $outputPath).Length\n\n        if ($finalSize -ge $MinSize -and $finalSize -le $MaxSize) {\n            $compressed = $true\n            break\n        } elseif ($finalSize -gt $MaxSize) {\n            $quality -= 5\n            $scale -= 5\n        } elseif ($finalSize -lt $MinSize) {\n            $quality += 5\n            $scale += 5\n        }\n\n        # Lower bounds\n        if ($quality -lt 60) { $quality = 60 }\n        if ($scale -lt 50) { $scale = 50 }\n    }\n\n    if ($compressed) {\n        Write-Host \"✅ Final Size: $([Math]::Round($finalSize / 1024)) KB | Saved: $outputPath\"\n    } else {\n        Write-Host \"⚠️ Could not reach target size range: $relativePath\"\n    }\n}\n\nWrite-Host \"🎉 Compression Completed!\"",
            "language": "ps1",
            "notes": [
              "📁 Input and output can be the same folder.",
              "🔍 Recursively searches for images in subdirectories.",
              "⚖️ Dynamically adjusts quality and scale to meet size constraints.",
              "🧠 Skips already optimized files.",
              "📸 Outputs images in optimized WEBP format."
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      },
      {
        "id": "powershell-script-to-automatically-rotate-vertical-images-using-imagemagick",
        "title": "PowerShell Script to Automatically Rotate Vertical Images Using ImageMagick",
        "description": "This PowerShell script scans a specified directory recursively to identify all image files (including .jpg, .jpeg, .png, .webp, .bmp, .tiff, and .gif formats). It uses ImageMagick to detect image dimensions and automatically rotates vertical images (portrait orientation) by 90 degrees to align them horizontally (landscape orientation). This is particularly useful when batch-processing images for websites or digital catalogs to ensure consistent layout and appearance. The script ensures ImageMagick is installed and provides clear logs of the processing status for each image.",
        "difficulty": "intermediate",
        "timeEstimate": "",
        "prerequisites": [
          "ImageMagick",
          "Windows Powershell"
        ],
        "content": [
          {
            "title": "✅ create \"Rotate-Images.ps1\" file",
            "description": "run command to execute script: \"./Rotate-Images.ps1\"",
            "code": "# Set input/output folder\n$InputFolder = \"D:\\Downloads\\Test1\"\n\n# Ensure ImageMagick is installed\n$magickPath = (Get-Command magick -ErrorAction SilentlyContinue).Source\nif (-not $magickPath) {\n    Write-Host \"ImageMagick is not installed. Please install it from: https://imagemagick.org/\"\n    exit\n}\n\n# Get all .webp files recursively\n# $files = Get-ChildItem -Path $InputFolder -Recurse -File -Filter *.webp\n\n# Extensions to check (add more if needed)\n$extensionsPattern = '\\.(jpg|jpeg|png|webp|bmp|tiff|gif)$'\n\n# Get all image files recursively\n$files = Get-ChildItem -Path $InputFolder -Recurse -File | Where-Object { $_.Extension -match $extensionsPattern }\n\nWrite-Host \"Found $($files.Count) image files\"\n\nforeach ($file in $files) {\n    $filePath = $file.FullName\n\n    # Get dimensions using ImageMagick's identify\n    $dimensions = & magick identify -format \"%w %h\" \"$filePath\"\n    $width, $height = $dimensions -split \" \"\n\n    if ([int]$height -gt [int]$width) {\n        Write-Host \"Rotating vertical image to horizontal: $filePath\"\n\n        # Rotate the image 90 degrees and overwrite it\n        & magick \"$filePath\" -rotate 90 \"$filePath\"\n\n        Write-Host \"Rotated: $filePath\"\n    }\n    else {\n        Write-Host \"Already horizontal: $filePath\"\n    }\n}\n\nWrite-Host \"Vertical image rotation completed!\"",
            "language": "ps1",
            "notes": [
              "Automates bulk image orientation correction",
              "Ensures consistent landscape presentation for web/catalog use",
              "Easily extendable to include batch compression for faster page loads"
            ],
            "links": []
          }
        ],
        "troubleshooting": []
      }
    ]
  },
  config: {
    title: "Configuration & Setup",
    description: "Development environment setup and configuration files",
    topics: [
      {
        "id": "vscode-setup",
        "title": "VS Code Setup – Khushali's Dev Toolkit",
        "description": "Bulletproof extensions & settings for frontend/backend warriors.",
        "difficulty": "beginner",
        "content": [
          {
            "title": "🎨 Frontend Developer Setup",
            "code": "// Extensions to install (search in VS Code extensions marketplace)\n{\n  \"recommendations\": [\n    \"esbenp.prettier-vscode\",              // Code formatter\n    \"dbaeumer.vscode-eslint\",              // JS/TS linting\n    \"eamodio.gitlens\",                     // Git superpowers\n    \"bradlc.vscode-tailwindcss\",           // Tailwind IntelliSense\n    \"formulahendry.auto-rename-tag\",       // Auto rename paired HTML/JSX tags\n    \"formulahendry.auto-close-tag\",        // Auto close HTML/JSX tags\n    \"ecmel.vscode-html-css\",               // HTML class helper\n    \"stylelint.vscode-stylelint\",          // CSS/SCSS/Styled linting\n    \"ms-playwright.playwright\",            // UI Testing for frontend\n    \"usernamehw.errorlens\",                // Highlights errors inline\n    \"PKief.material-icon-theme\",           // Pretty icons in sidebar\n    \"ritwickdey.liveserver\"                // Live reload for HTML/CSS work\n  ]\n}\n",
            "language": "json",
            "description": "React / Next.js / Tailwind / TypeScript / Styled Components"
          },
          {
            "title": "⚙️ Frontend VS Code Settings (settings.json)",
            "code": "{\n  \"editor.formatOnSave\": true,\n  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",\n  \"editor.codeActionsOnSave\": {\n    \"source.fixAll.eslint\": true\n  },\n  \"editor.tabSize\": 2,\n  \"files.autoSave\": \"onFocusChange\",\n  \"emmet.includeLanguages\": {\n    \"javascript\": \"javascriptreact\",\n    \"typescript\": \"typescriptreact\"\n  },\n  \"tailwindCSS.includeLanguages\": {\n    \"typescriptreact\": \"html\",\n    \"javascriptreact\": \"html\"\n  },\n  \"javascript.updateImportsOnFileMove.enabled\": \"always\",\n  \"explorer.confirmDelete\": false,\n  \"workbench.iconTheme\": \"material-icon-theme\",\n  \"terminal.integrated.defaultProfile.windows\": \"Git Bash\"\n}",
            "language": "json"
          },
          {
            "title": "🛠️ Backend Developer Setup",
            "code": "{\n  \"recommendations\": [\n    \"esbenp.prettier-vscode\",              // Code formatter\n    \"dbaeumer.vscode-eslint\",              // Linting JS/TS\n    \"aaron-bond.better-comments\",          // Highlight TODO, FIXME, etc.\n    \"mikestead.dotenv\",                    // .env syntax highlighting\n    \"mongodb.mongodb-vscode\",              // MongoDB integration\n    \"prisma.prisma\",                       // Prisma ORM (if used)\n    \"ms-azuretools.vscode-docker\",         // Docker dev tools\n    \"humao.rest-client\",                   // API testing (Postman alt)\n    \"github.vscode-pull-request-github\",   // GitHub PR management\n    \"ms-vscode.vscode-typescript-next\",    // Next-gen TS support\n    \"codezombiech.gitignore\",              // `.gitignore` helper\n    \"eamodio.gitlens\"                      // Advanced git tracking\n  ]\n}",
            "language": "json",
            "description": "Node.js / Express / Sequelize ORM / MongoDB / PostgreSQL"
          },
          {
            "title": "⚙️ Backend VS Code Settings (settings.json)",
            "description": "",
            "code": "{\n  \"editor.formatOnSave\": true,\n  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",\n  \"editor.codeActionsOnSave\": {\n    \"source.fixAll.eslint\": true\n  },\n  \"editor.tabSize\": 2,\n  \"files.autoSave\": \"onWindowChange\",\n  \"explorer.confirmDelete\": false,\n  \"workbench.iconTheme\": \"material-icon-theme\",\n  \"terminal.integrated.defaultProfile.windows\": \"Git Bash\",\n  \"git.autofetch\": true\n}",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": "✨ Common Prettier Config (.prettierrc)",
            "description": "",
            "code": "{\n  \"semi\": true,\n  \"trailingComma\": \"all\",\n  \"singleQuote\": true,\n  \"printWidth\": 100,\n  \"tabWidth\": 2,\n  \"arrowParens\": \"avoid\",\n  \"bracketSpacing\": true\n}",
            "language": "bash",
            "notes": [],
            "links": []
          },
          {
            "title": ".prettierignore",
            "description": "",
            "code": "node_modules\ndist\nbuild\n.next\ncoverage\n*.md\n.env",
            "language": "bash",
            "notes": [],
            "links": []
          }
        ]
      },
      {
        id: "env-variables",
        title: "Environment Variables Setup",
        description: "Managing environment variables across different platforms",
        difficulty: "beginner",
        content: [
          {
            title: "Node.js Environment Variables",
            code: `// .env (never commit this file)
# Database
DATABASE_URL=mongodb://localhost:27017/myapp
POSTGRES_URL=postgresql://user:password@localhost:5432/myapp

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=7d

# External APIs
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
SENDGRID_API_KEY=your_sendgrid_api_key

# App Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# AWS
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-west-2
S3_BUCKET_NAME=your-s3-bucket`,
            language: "bash"
          },
          {
            title: "React Environment Variables",
            code: `// .env.local (for Next.js/React)
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=UA-XXXXXXXXX-X
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_MAINTENANCE_MODE=false

# Database (server-side only - no NEXT_PUBLIC prefix)
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

// Usage in React/Next.js:
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const dbUrl = process.env.DATABASE_URL; // Server-side only`,
            language: "javascript"
          },
          {
            title: "Docker Environment Variables",
            code: `# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
      - JWT_SECRET=\${JWT_SECRET}
    env_file:
      - .env.production

# .env.production (for production deployment)
NODE_ENV=production
DATABASE_URL=mongodb://mongo:27017/myapp_prod
JWT_SECRET=super-secure-production-secret
REDIS_URL=redis://redis:6379

# GitHub Actions secrets usage
- name: Deploy
  env:
    DATABASE_URL: \${{ secrets.DATABASE_URL }}
    JWT_SECRET: \${{ secrets.JWT_SECRET }}
  run: |
    echo "Deploying with environment variables"`,
            language: "yaml"
          }
        ]
      }
    ]
  }
};
