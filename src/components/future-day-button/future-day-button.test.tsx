import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import FutureDayButton, { FutureDateLabel } from './future-day-button';

afterEach(cleanup);

describe('FutureDayButton', () => {
  describe('Dates', () => {
    let systemDate = new Date(2025, 0, 13, 9, 0, 0); // 13/01/2025 Monday

    beforeEach(() => {
      systemDate = new Date(2025, 0, 13, 9, 0, 0); // 13/01/2025 Monday

      vi.useFakeTimers({ shouldAdvanceTime: true });
      vi.setSystemTime(systemDate);
    })

    afterEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
    })

    test.todo.each([
      ['Tomorrow', 'Tue'],
      ['Later this week', 'Thu'],
      ['This weekend', 'Sat'],
      ['Next week', 'Mon'],
    ])('should render the correct day for the label', (label, expectedDay) => {     
      const screen = render(<FutureDayButton label={label as FutureDateLabel} onClick={() => {}} />);
      const day = screen.getByText(expectedDay);
      
      expect(day).toBeDefined();
    });

    test.each([
      ['Tomorrow', 1],
      ['Later this week', 3],
      ['This weekend', 5],
      ['Next week', 7],
    ])('should parse the correct date for the label', (label, increment) => {    
      const expectedDate = new Date(systemDate);
      expectedDate.setDate(expectedDate.getDate() + increment);
  
      const { container } = render(<FutureDayButton label={label as FutureDateLabel} onClick={(date) => {
        expect(date.toISOString()).toBe(expectedDate.toISOString());
      }} />);
  
      const button = container.querySelector('button');
  
      button?.click();
    });
  });

  test.each([
    'Tomorrow',
    'Later this week',  
    'This weekend',
    'Next week',
  ])('should the button with the correct label', (label) => {
    const screen = render(<FutureDayButton label={label as FutureDateLabel} onClick={() => {}} />);
    const button = screen.getByRole('button');

    expect(button.innerText).toContain(label);
  });

  test.each([
    ['Tomorrow', 'sun'],
    ['Later this week', 'calendar'],
    ['This weekend', 'sofa'],
    ['Next week', 'calendar-arrow-up'],
  ])('should render the correct icon for the label', (label, icon) => {
    const { container } = render(<FutureDayButton label={label as FutureDateLabel} onClick={() => {}} />);
    const sunIcon = container.querySelector(`svg`);
    
    expect(sunIcon?.classList.toString()).toContain(icon);
  });

  test('should call the onClick function when the button is clicked', () => {
    const onClick = vi.fn();
    const { container } = render(<FutureDayButton label='Tomorrow' onClick={onClick} />);
    const button = container.querySelector('button');

    button?.click();

    expect(onClick).toHaveBeenCalled();
  });
});