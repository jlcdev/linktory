import express from "express"
import morgan from "morgan"
import routes from "@routes/AppRoutes"

const port = parseInt(process.env.APP_PORT || "3000", 10)
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))

// Load all app routes
app.use('/api/v1', routes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app