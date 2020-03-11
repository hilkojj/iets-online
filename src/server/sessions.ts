import {Socket} from "socket.io";
import {User} from "../common/models/User";

export interface Session {

    user: User

}

export class Sessions {

    private socketToSessionMap: {[sockId: string]: Session} = {}

    /**
     * Gets the Session belonging to a socket
     */
    public getSessionFor(socket: Socket): Session {
        return this.socketToSessionMap[socket.id]
    }

    /**
     * Creates a Session for a user
     * @param user      The user
     * @param socket    The socket the user is connected with
     */
    public createSessionFor(user: User, socket: Socket): Session {
        this.socketToSessionMap[socket.id] = { user }
        return this.getSessionFor(socket)
    }

    /**
     * Ends an active session (user could use same socket for a new session)
     */
    public endSessionFor(socket: Socket) {
        delete this.socketToSessionMap[socket.id]
    }

}
