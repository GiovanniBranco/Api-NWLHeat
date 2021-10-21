import prismaClient from "../prisma";

class ProfileUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id,
      },
      rejectOnNotFound: true,
    });

    return user;
  }
}
export { ProfileUserService };
