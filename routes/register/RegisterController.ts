import {Socket} from "socket.io";
import {RegistryService} from "../../utils/RegistryService";

export class RegisterController {
    private registryService: RegistryService;
    private registeredCode: string;

    constructor(socket: Socket) {
        this.registryService = RegistryService.instance;
        this.registeredCode = "";
        this.init(socket);
    }

    private init(socket: Socket) {
        socket.on("register", code => {
            const error = this.registryService.register(code, socket);
            if (error != null) {
                socket.emit("error", error.type);
            }
            this.registeredCode = code;
        })

        socket.on("disconnect", () => {
            this.registryService.removeRegister(this.registeredCode);
        })
    }
}