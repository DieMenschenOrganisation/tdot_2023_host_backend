import express, {Router} from "express";
import {RegistryService} from "../../utils/RegistryService";

export class RequestController {
    router: Router;
    registryService: RegistryService;

    constructor() {
        this.router = express.Router();
        this.registryService = RegistryService.instance;
        this.init();
    }

    private init() {
        this.router.get("/", (req, res) => {
            const userID = req.query.userID as string;
            const code = req.query.code as string;

            if (userID == null) {
                return res.status(400).send("No user id passed!");
            } else if (code == null) {
                return res.status(400).send("No host code passed!");
            }

            this.registryService.request(code, userID);

            res.send("ok");
        })
    }
}