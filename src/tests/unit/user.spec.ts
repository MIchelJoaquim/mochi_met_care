
import { userDTO } from '../../user/userDTO'

test('it should be ok', () => {
  const user: userDTO = { nome: 'Michel', email: 'michel@gmail.com' }
  expect(user.nome).toEqual('Michel')
})
