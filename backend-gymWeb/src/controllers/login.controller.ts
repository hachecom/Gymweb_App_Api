import { Action, ApiController, ConfigurationBuilder, Controller, HttpMethod } from "@miracledevs/paradigm-express-webapi";
import { MySqlConnection } from "../core/mysql/mysql.connection";
import { User } from "../models/user";
import { error } from "console";
import { POST, Path } from "typescript-rest";
import { AuthUser } from "./auth.user";
import { Configuration } from "../configuration/configuration";
import jwt from "jsonwebtoken";
import { Tags } from "typescript-rest-swagger";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { AuthService } from "../services/auth.service";

@Tags("Auth")
@Path("/api/auth")
@Controller({ route: "/api/auth" })
export class LoginController extends ApiController {
    config: Configuration;
    salt: string;
    constructor(config: ConfigurationBuilder, private repo: UserRepository, private auth: AuthService) {
        super();
        this.config = config.build(Configuration);
    }

    @POST
    @Path("/login")
    @Action({ route: "/login", fromBody: true })
    async post(authUser: AuthUser): Promise<string> {
        try {
            const valid = await this.auth.validateUser(authUser);
            if (valid) {
                return jwt.sign({ user: authUser.username }, this.config.jwtSecret);
            }
            this.httpContext.response.sendStatus(401);
        } catch (error) {
            console.log(error);
            this.httpContext.response.sendStatus(500);

            return;
        }
    }

    @POST
    @Path("/register")
    @Action({ route: "/register", fromBody: true, method: HttpMethod.POST })
    async register(user: User): Promise<string> {
        try {
            //falta lógica de validación de campos requeridos //
            // que se llamaría desde services -> auth.services.ts //
            this.auth.registerUser(user);
            this.httpContext.response.sendStatus(201);
        } catch {
            this.httpContext.response.sendStatus(500);

            return;
        }
    }
}