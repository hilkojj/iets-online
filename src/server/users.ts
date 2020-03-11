import {User} from "../common/models/User";
import * as fs from "fs";

export class Users {

    private static SAVE_FILE_PATH = "./data/users.json"

    private users: User[]

    constructor() {
        this.loadUsersSync()
    }

    /**
     * will try to create a user.
     * Returns the user if success, null otherwise
     */
    public createUser(name: string): User | null {

        if (this.userExists(name)) return null

        let user = { name }
        this.users.push(user)
        this.saveUsers()

        return user
    }

    /**
     * Checks if a username is taken
     */
    public userExists(name: string): boolean {
        return this.getUserByName(name) != null
    }

    /**
     * Find a user by name, returns null if not found
     */
    public getUserByName(name: string): User | null {
        return this.users.find(u => u.name == name)
    }

    /**
     * Saves the users (asynchronously)
     */
    private saveUsers() {
        fs.writeFile(Users.SAVE_FILE_PATH, JSON.stringify(this.users), err => err && console.error(err))
    }

    /**
     * Loads the users (synchronously)
     */
    private loadUsersSync() {
        this.users = fs.existsSync(Users.SAVE_FILE_PATH) ? JSON.parse(fs.readFileSync(Users.SAVE_FILE_PATH).toString()) : []
    }
}
