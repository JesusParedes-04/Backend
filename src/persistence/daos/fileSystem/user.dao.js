import FSDao from "./fs.dao.js";
const path = "/src/daos/fileSystem/users.json";

export default class UserDaoFS extends FSDao {
    constructor() {
        super(path);
    }
};