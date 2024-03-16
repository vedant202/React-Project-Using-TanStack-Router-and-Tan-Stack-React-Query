"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = 3000;
app.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 10;
    const { page = 1 } = req.query;
    console.log("req query :- ", req.query);
    const totalPost = yield db_1.default.post.count();
    console.log("Total Number of posts ", totalPost);
    let isnextposts = false;
    let nextPage = 0;
    if ((totalPost - (limit * Number(page))) >= 0) {
        isnextposts = true;
        nextPage = Number(page) + 1;
    }
    else {
        isnextposts = false;
    }
    console.log("nex page available " + isnextposts);
    const posts = (totalPost - (limit * Number(page))) >= 0 ? yield db_1.default.post.findMany({
        skip: limit * (Number(page) - 1),
        take: limit,
    }) : [];
    res.status(200).json({ posts: posts, nextPage: nextPage, nextPostAvailable: isnextposts });
}));
app.post("/post/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = Number(req.params.id);
    console.log(params);
    const post = yield db_1.default.post.findUnique({
        where: {
            id: params
        }
    });
    res.json({ success: true, post: post });
}));
app.post("/createPost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const postSaved = yield db_1.default.post.create({
        data: body
    });
    console.log("Body :- ", postSaved);
    // console.log("Body :- ",postSaved);
    return res.json({ success: true, post: postSaved });
}));
app.listen(port, () => {
    console.log("App is listening on port " + port);
});
//# sourceMappingURL=app.js.map