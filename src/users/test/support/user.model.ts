import { MockModel } from '../../../database/test/support/mock.model';
import { userStub } from '../stubs/user.stub';

export class UserModel extends MockModel<any> {
  protected entityStub = userStub();
}
