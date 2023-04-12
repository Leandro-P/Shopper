import app from "./App"
import { purchaseRouter } from "./routes/purchasesRouter"
import { stockRouter } from "./routes/stockRouter"

app.use("/purchase", purchaseRouter)

app.use("/stock", stockRouter)