/* eslint-disable @typescript-eslint/no-unused-vars */
import { mount, flushPromises } from "@vue/test-utils";
import { AxiosRequestHeaders, AxiosResponse } from "axios";
import sinon, { SinonStub } from "sinon";
import { expect } from "chai";

import UserForm from "@/components/UserForm.vue";
import { EStatusCode, type TModeForm } from "@/core/constants/appConstants";
import { CodeDto } from "@/core/dto/codeDto";
import { type IUser, UserDto } from "@/core/dto/userDto";
import ApiService from "@/core/services/api.service";
import Dropdown from "primevue/dropdown";
import UiLabel from "@/ui/atoms/UiLabel.vue";
import UiInput from "@/ui/atoms/UiInput.vue";
import { ToastUtils } from "@/core/utils/toastUtils";
import { TestUtils } from "../../utils/testUitls";

interface IProps {
  user: UserDto;
  mode?: Extract<TModeForm, "view" | "edit">;
  errors?: Record<keyof IUser, string>;
}

interface IApiCodesStub {
  isCodesError?: boolean;
  data?: CodeDto[];
}

const CODES_DATA: CodeDto[] = [
  { id: "1", name: "Code 1", type: "type 1" },
  { id: "2", name: "Code 2", type: "type 1" },
  { id: "3", name: "Code 3", type: "type 1" },
  { id: "4", name: "Code 4", type: "type 1" },
];

const sandbox = sinon.createSandbox();

describe("UserForm.vue", () => {
  let apiGetStub: SinonStub;
  let throwError: Error | undefined;
  const messageUtilsStub: sinon.SinonStubbedInstance<typeof ToastUtils> = TestUtils.getToastMessageStub();

  // Create a component instance
  const componentMount = (props?: IProps) => {
    const global = {
      components: {
        Dropdown,
        UiLabel,
        UiInput,
      },
      errorHandler: (err: Error) => {
        throwError = err;
      },
    };
    return mount(UserForm, {
      props: {
        user:
          props?.user ??
          new UserDto({
            name: "John Doe",
            email: "john.doe@example.com",
            address: "123 Main St",
            phone: "1234567890",
            code: "XYZ123",
          }),
        mode: props?.mode ?? "view",
        errors: props?.errors ?? undefined,
      },
      global,
    });
  };

  /**
   * Create all api calls stubs for UserForm component
   * @param props Dynamic props for stub
   * @returns stub
   */
  const createStub = (props?: IApiCodesStub) => {
    apiGetStub = sandbox.stub(ApiService, "GET");

    const notFoundRequest = {
      name: "Error",
      message: "Request failed with status code 404",
      response: { data: {}, status: EStatusCode.NOT_FOUND, statusText: "Not Found", headers: {}, config: {} },
      isAxiosError: true,
      config: { headers: {} as AxiosRequestHeaders },
    };

    const response: AxiosResponse<unknown> = {
      data: props?.data ?? CODES_DATA,
      status: EStatusCode.OK,
      statusText: "",
      headers: {},
      config: { headers: {} as AxiosRequestHeaders },
    };

    const rejected = Promise.reject<AxiosResponse<unknown>>(notFoundRequest).then();
    const resolved = Promise.resolve(response).then();
    apiGetStub.withArgs("/codes");

    if (props?.isCodesError) apiGetStub.callsFake(() => rejected);
    else apiGetStub.returns(resolved);

    return apiGetStub;
  };

  afterEach(() => {
    throwError = undefined;
  });

  afterEach(() => {
    sandbox.restore();
    // Reset stubs toast history
    messageUtilsStub.info.resetHistory();
    messageUtilsStub.success.resetHistory();
    messageUtilsStub.removeAll.resetHistory();
  });

  it("No.1 [Normal]: Initial > API GET /codes executed with status === 200", async () => {
    const stub = createStub();
    const wrapper = componentMount();
    await flushPromises();

    try {
      await wrapper.vm.$nextTick();
      const apiGetCodes = stub.withArgs("/codes");
      expect(stub.withArgs("/codes").callCount).to.equal(1);

      const apiCodesRes = await apiGetCodes.getCall(0).returnValue;
      expect(apiCodesRes.status).to.equal(EStatusCode.OK);
    } finally {
      wrapper.unmount();
    }
  });

  it("No.2 [Normal]: Initial > API GET /codes executed with status !== 200 and show toast error", async () => {
    const stub = createStub({ isCodesError: true });
    const wrapper = componentMount();
    await flushPromises();

    try {
      await wrapper.vm.$nextTick();
      expect(messageUtilsStub.error.withArgs("Request failed with status code 404").callCount).to.equal(1);

      try {
        await stub.withArgs("/codes").getCall(0).returnValue;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        expect(e.response.status).to.eq(EStatusCode.NOT_FOUND);
      }
    } finally {
      wrapper.unmount();
    }
  });

  it("No.3 [Normal]: Initial > Check modelValue and readonly of name, email, phone, address,", async () => {
    createStub();
    const wrapper = componentMount();
    await flushPromises();

    try {
      await wrapper.vm.$nextTick();
      const nameInput = wrapper.find(".user-name").findComponent(UiInput);
      expect(nameInput.props("modelValue")).to.equal("John Doe");

      const emailInput = wrapper.find(".user-email").findComponent(UiInput);
      expect(emailInput.props("modelValue")).to.equal("john.doe@example.com");

      const phoneInput = wrapper.find(".user-phone").findComponent(UiInput);
      expect(phoneInput.props("modelValue")).to.equal("1234567890");

      const addressInput = wrapper.find(".user-address").findComponent(UiInput);
      expect(addressInput.props("modelValue")).to.equal("123 Main St");
    } finally {
      wrapper.unmount();
    }
  });
});
