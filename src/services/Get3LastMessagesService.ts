import prismaClient from "../prisma";

class Get3LastMessagesService {
  async execute(user_id: string) {
    //Crio a mensagem que será cadastrada;
    const messages = await prismaClient.message.findMany({
      where: {
        user_id: user_id,
      },
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return messages;
  }
}
export { Get3LastMessagesService };
