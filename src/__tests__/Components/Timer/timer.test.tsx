import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Timer from "../../../components/common/timers/Timer";
import { act } from "react-dom/test-utils";

describe("Timer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("renderiza el valor inicial del temporizador", () => {
    render(
      <Timer duration={10} onTimeout={() => {}} text="Tiempo restante: " />
    );

    expect(screen.getByText(/Tiempo restante: 10/i)).toBeInTheDocument();
  });

  it("llama a onTimeout cuando el temporizador llega a 0", () => {
    const onTimeoutMock = vi.fn();

    render(
      <Timer duration={3} onTimeout={onTimeoutMock} text="Tiempo restante: " />
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onTimeoutMock).toHaveBeenCalled();
  });

  it("actualiza el temporizador cada segundo", () => {
    render(
      <Timer duration={5} onTimeout={() => {}} text="Tiempo restante: " />
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText(/Tiempo restante: 4/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText(/Tiempo restante: 2/i)).toBeInTheDocument();
  });

  it("renderiza el temporizador sin texto adicional si no se pasa la prop 'text'", () => {
    render(<Timer duration={10} onTimeout={() => {}} />);

    expect(screen.getByText(/10/i)).toBeInTheDocument();
    expect(screen.queryByText(/Tiempo restante:/i)).toBeNull();
  });
});
