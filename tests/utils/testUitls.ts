import { ToastUtils } from "@/core/utils/toastUtils";
import sinon from "sinon";

class TestUtils {
  private static messageUtilsStub: sinon.SinonStubbedInstance<typeof ToastUtils>;

  public static getToastMessageStub(): sinon.SinonStubbedInstance<typeof ToastUtils> {
    const sandbox = sinon.createSandbox();

    if (!this.messageUtilsStub) {
      this.messageUtilsStub = sandbox.stub(ToastUtils);
    }

    return this.messageUtilsStub;
  }
}

export { TestUtils };
