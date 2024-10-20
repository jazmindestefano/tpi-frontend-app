import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SnakeGame from "../../../pages/games/SnakeGame";
import { useAudioRecording } from "../../../hooks/useAudioRecording";
import { useSpeakText } from "../../../hooks/useSpeakText";
import { useSelectedGame } from "../../../hooks/selectors";

vi.mock("../../../hooks/useAudioRecording");
vi.mock("../../../hooks/useSpeakText");
vi.mock("../../../hooks/selectors");

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
    MemoryRouter: (actual as { MemoryRouter: typeof MemoryRouter })
      .MemoryRouter, // Asegurarse de que MemoryRouter esté incluido
  };
});

describe("SnakeGame", () => {
  beforeEach(() => {
    (useAudioRecording as jest.Mock).mockReturnValue({
      isRecording: false,
      audio: null,
      startRecording: vi.fn(),
      stopRecording: vi.fn(),
    });
    (useSpeakText as jest.Mock).mockReturnValue(vi.fn());
    (useSelectedGame as jest.Mock).mockReturnValue({ id: 1 });
  });

  it("renders the SnakeGame component", () => {
    render(
      <MemoryRouter>
        <SnakeGame />
      </MemoryRouter>
    );

    expect(screen.getByText(/vocales comidas/i)).toBeInTheDocument();
    expect(
      screen.getByText(/presiona espacio para pausar\/reanudar/i)
    ).toBeInTheDocument();
  });

  //   it("pauses and resumes the game", () => {
  //     render(
  //       <MemoryRouter>
  //         <SnakeGame />
  //       </MemoryRouter>
  //     );

  //     expect(screen.queryByText(/PAUSED/i)).not.toBeInTheDocument();

  //     const pauseButton = screen.getByLabelText(/pause game/i);
  //     fireEvent.click(pauseButton);

  //     expect(screen.getByText(/PAUSED/i)).toBeInTheDocument();

  //     fireEvent.click(pauseButton);
  //     expect(screen.queryByText(/PAUSED/i)).not.toBeInTheDocument();
  //   });

  it("handles arrow key presses to change direction", () => {
    render(
      <MemoryRouter>
        <SnakeGame />
      </MemoryRouter>
    );

    fireEvent.keyDown(window, { key: "ArrowUp" });
  });

  //   it("records audio when it becomes available", async () => {
  //     const mockAudioBlob = new Blob(["audio data"], { type: "audio/wav" });
  //     (useAudioRecording as jest.Mock).mockReturnValueOnce({
  //       isRecording: true,
  //       audio: mockAudioBlob,
  //       startRecording: vi.fn(),
  //       stopRecording: vi.fn(),
  //     });

  //     render(
  //       <MemoryRouter>
  //         <SnakeGame />
  //       </MemoryRouter>
  //     );

  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     expect(mockNavigate).toHaveBeenCalledWith("/felicitaciones");
  //   });

  //   it("finishes the game when all items are eaten", () => {
  //     render(
  //       <MemoryRouter>
  //         <SnakeGame />
  //       </MemoryRouter>
  //     );

  //     fireEvent.click(screen.getByText(/continue/i));

  //     expect(mockNavigate).toHaveBeenCalledWith("/felicitaciones");
  //   });

  it("updates grid size on window resize", () => {
    render(
      <MemoryRouter>
        <SnakeGame />
      </MemoryRouter>
    );

    window.innerWidth = 800;
    fireEvent.resize(window);

    expect(screen.getByText(/vocales comidas/i)).toBeInTheDocument();
  });
});
