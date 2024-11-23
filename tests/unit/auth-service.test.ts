import UserModel, { User } from "../../src/models/user.model";
import { login, register } from "../../src/services/auth.service";
import { encrypt } from "../../src/utils/encryption";

jest.mock("../../src/models/user.model")

describe("Test Auth Service", () => {
    const mockUser: User = {
        fullName: "John Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "nopass123",
        roles: ["user"],
        profilePicture: "user.jpg",
        createdAt: new Date().toString(),
    };

    test("1. POST - Register User (POSITIVE CASE)", async () => {
        (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
        const result = await register({
            email: mockUser.email,
            fullName: mockUser.fullName,
            username: mockUser.username,
            password: mockUser.password,
            roles: mockUser.roles,
        });

        // Assertions
        expect(result?.email).toBe(mockUser.email)
        expect(result?.fullName).toBe(mockUser.fullName)
        expect(result?.username).toBe(mockUser.username)
        expect(result?.roles).toEqual(mockUser.roles)
    });

    test("2. POST - Login User (POSITIVE CASE)", async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
        const encryptedPassword = encrypt(mockUser.password);

        (UserModel.findOne as jest.Mock).mockResolvedValueOnce({
            ...mockUser,
            password: encryptedPassword,
        });

        const token = await login({
            email: mockUser.email,
            password: mockUser.password, 
        });

        // Assertions
        expect(token).toBeDefined()
        expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email })
    });
});
