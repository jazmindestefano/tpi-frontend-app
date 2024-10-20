import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import { BaseModal } from "../../../components/common/modals/BaseModal";

describe("BaseModal", () => {
  let onCloseMock: Mock;

  beforeEach(() => {
    onCloseMock = vi.fn();
  });

  it("renderiza el título y el contenido (children) correctamente", () => {
    render(
      <BaseModal title="Test Modal" onClose={onCloseMock}>
        <p>Contenido del modal</p>
      </BaseModal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();

    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  it("llama a onClose cuando se hace clic en el botón de cerrar", () => {
    render(
      <BaseModal title="Test Modal" onClose={onCloseMock}>
        <p>Contenido del modal</p>
      </BaseModal>
    );

    fireEvent.click(screen.getByText("X"));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("llama a speakText cuando se hace clic en el botón de volumen si speak es true", () => {
    render(
      <BaseModal title="Test Modal" onClose={onCloseMock} speak={true}>
        <p>Contenido del modal</p>
      </BaseModal>
    );
  });

  it("no renderiza el botón de volumen si speak es false", () => {
    render(
      <BaseModal title="Test Modal" onClose={onCloseMock} speak={false}>
        <p>Contenido del modal</p>
      </BaseModal>
    );

    const volumeButton = screen.queryByRole("button", { name: /volume/i });
    expect(volumeButton).toBeNull();
  });
});
