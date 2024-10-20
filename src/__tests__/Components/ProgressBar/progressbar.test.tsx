import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgressBar from "../../../components/progressBar/ProgressBar";

describe("ProgressBar", () => {
  it("renders the progress bar with default values", () => {
    render(<ProgressBar />);

    const progressBarContainer = screen.getByRole("progressbar");
    expect(progressBarContainer).toBeInTheDocument();
    
    const progressElement = progressBarContainer.firstChild as HTMLElement;
    expect(progressElement).toHaveStyle("width: 0%");
  });

  it("calculates the correct progress based on currentActivity and totalActivities", () => {
    render(<ProgressBar currentActivity={2} totalActivities={5} />);

    const progressBarContainer = screen.getByRole("progressbar");
    const progressElement = progressBarContainer.firstChild as HTMLElement;
    
    expect(progressElement).toHaveStyle("width: 40%");
  });

  it("limits the progress to 100% if currentActivity exceeds totalActivities", () => {
    render(<ProgressBar currentActivity={10} totalActivities={5} />);

    const progressBarContainer = screen.getByRole("progressbar");
    const progressElement = progressBarContainer.firstChild as HTMLElement;
    
    expect(progressElement).toHaveStyle("width: 100%");
  });

  it("ensures the progress is 0% when currentActivity is less than 0", () => {
    render(<ProgressBar currentActivity={-1} totalActivities={5} />);

    const progressBarContainer = screen.getByRole("progressbar");
    const progressElement = progressBarContainer.firstChild as HTMLElement;

    expect(progressElement).toHaveStyle("width: 0%");
  });

  it("renders the image at the correct position based on the progress", () => {
    render(<ProgressBar currentActivity={2} totalActivities={5} />);

    const imgElement = screen.getByAltText("clara");

    expect(imgElement).toHaveStyle("left: calc(40% - 20px)");
  });
});
