import React from "react";
import { render, fireEvent } from "@testing-library/react";

import TodoForm from "./TodoForm";

describe("<TodoForm/> 테스트", () => {
  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />);
    const { getByText, getByPlaceholderText } = utils;
    const input = getByPlaceholderText("할 일을 입력하세요.");
    const button = getByText("등록");
    return {
      ...utils,
      input,
      button
    };
  };

  it("입력 텍스트필드와 등록버튼 존재 여부", () => {
    const { input, button } = setup();

    expect(input).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it("입력 텍스트필드 값 변경 테스트", () => {
    const {input} = setup();
    
    fireEvent.change(input, {
      target: {
        value: "TDD배우기"
      }
    });

    expect(input).toHaveValue("TDD배우기");
  });

  it("onInsert 메쏘드 호출과 입력 필드 클리어", () => {
    const onInsert = jest.fn();
    const {input,button} = setup({onInsert});
    
    fireEvent.change(input, {
      target: {
        value: "TDD배우기"
      }
    });

    fireEvent.click(button);
    expect(onInsert).toBeCalledWith("TDD배우기");
    expect(input).toHaveAttribute("value", "");
  });
});
