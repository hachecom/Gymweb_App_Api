import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { AuthUser } from "../models/auth.user";
import { User } from "../models/user";
import { DependencyLifeTime, Injectable } from "@miracledevs/paradigm-web-di";

@Injectable({ lifeTime: DependencyLifeTime.Scoped })
export class AuthService {
    constructor(private repo: UserRepository) {}

    async validateAuthPassword(authUser: AuthUser): Promise<boolean> {
        const users = await this.repo.findByUserName(authUser.username);
        if (users.length > 0) {
            return await bcrypt.compare(authUser.password, users[0].password);
        }
    }

    async validateAuthUsername(authUser: AuthUser): Promise<boolean> {
        const username = await this.repo.findByUserName(authUser.username);
        if (username.length === 0) {
            return false;
        }
        return true;
    }
    async registerUser(user: User) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await this.repo.insertOne(user);
    }

    async validateUsername(user: User): Promise<boolean> {
        const username = await this.repo.findByUserName(user.username);
        if (username.length === 0) {
            return false;
        }
        return true;
    }
    async validateEmail(user: User): Promise<boolean> {
        const email = await this.repo.findByEmail(user.email);

        if (email.length === 0) {
            return false;
        }
        return true;
    }
    async validateDni(user: User): Promise<boolean> {
        const dni = await this.repo.findByDni(user.dni);

        if (dni.length === 0) {
            return false;
        }
        return true;
    }
    async validateFields(user: User): Promise<(string | boolean)[]> {
        const dniString = user.dni.toString();

        if (!/^\d{8}$/.test(dniString)) {
            return ["The dni is invalid", false];
        }
        if (!/\S+@\S+\.\S+/.test(user.email)) {
            return ["The email is invalid", false];
        }
        if (!(user.username.length > 7 && user.username.length < 16)) {
            return ["The username is invalid", false];
        }
        return ["The fields are correct", true];
    }
}
