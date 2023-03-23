"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
require("dotenv").config();
const PORT = process.env.PORT || 3000;
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
// Create Express app
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "public")));
app.use("/api", auth_routes_1.default);
app.use("/api/", user_routes_1.default);
app.use("/api/", product_routes_1.default);
// Set up routes
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "..", "public", "index.html"));
});
// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
