import { FastifyInstance } from 'fastify';

// Messages
enum EMessages {
  SuccessLogin = 'Вы успешно авторизовались',
  Authorized = 'Вы уже авторизованы',
  UnAuthorized = 'Вы не авторизованы',
  SuccessLogout = 'Вы успешно вышли из системы',
}

function hasAuthCookie(cookie: string | undefined) {
  return (
    cookie && cookie.split('; ').find((row) => row.startsWith('auth=true'))
  );
}

export async function routes(fastify: FastifyInstance) {
  fastify.get('/login', function (request, reply) {
    if (hasAuthCookie(request.headers.cookie)) {
      reply.send({ messages: EMessages.Authorized });
    } else {
      reply.header(
        'Set-Cookie',
        'auth=true; Path=/; HttpOnly; Secure; Max-Age=3600'
      );
      reply.send({ message: EMessages.SuccessLogin });
    }
  });

  fastify.get('/logout', async (request, reply) => {
    reply
      .header('Set-Cookie', 'auth=; Path=/; HttpOnly; Secure; Max-Age=0')
      .send({ message: 'Вы успешно вышли из системы' });
  });

  fastify.get('/status', function (request, reply) {
    if (hasAuthCookie(request.headers.cookie)) {
      reply.send({ message: EMessages.Authorized });
    } else {
      reply.send({ message: EMessages.UnAuthorized });
    }
  });
}
