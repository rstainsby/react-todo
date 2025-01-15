import { describe, test, expect, afterEach, vi, beforeEach } from 'vitest';
import { render, cleanup, renderHook } from '@testing-library/react';
import DatePicker from './date-picker';
import { Form, FormControl, FormField, FormItem} from '../shadcn/form';
import { useForm } from 'react-hook-form';

afterEach(cleanup);

describe('DatePicker', () => {
  describe('Rendering', () => {
    test('should render the date picker button', () => {
      const { result } = renderHook(() => useForm());
      const form = result.current;

      const screen = render((
        <Form {...form}>
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} onChange={() => {}}/>
              </FormControl>
            </FormItem>
          )}/>
        </Form>
      ));
      
      const button = screen.getByRole('button');
  
      expect(button).toBeDefined();
      expect(button.textContent).toBe('Date');
      expect(button.querySelector('svg')).toBeDefined();
    });
  
    test('should not render text when icon only is set', () => {
      const { result } = renderHook(() => useForm());
      const form = result.current;

      const screen = render((
        <Form {...form}>
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} onChange={() => {}} config={{iconOnly: true}}/>
              </FormControl>
            </FormItem>
          )}/>
        </Form>
      ));
      
      const button = screen.getByRole('button');
      expect(button).toBeDefined();
      expect(button.textContent).toBe('');
      expect(button.querySelector('svg')).toBeDefined();
    });
  
    test('should render the date picker popover when the button is clicked', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true });

      const date = new Date(Date.UTC(2024, 0, 1, 9, 0, 0)); // 01/01/2024 Monday
      vi.setSystemTime(date);

      const { result } = renderHook(() => useForm());
      const form = result.current;

      const screen = render((
        <Form {...form}>
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} onChange={() => {}} config={{iconOnly: true}}/>
              </FormControl>
            </FormItem>
          )}/>
        </Form>
      ));
      
      const button = screen.getByRole('button');
      button.click();

      const popover = await screen.findByRole('dialog');
      expect(popover).toBeDefined();

      const tomorrowButton = screen.getByText('Tomorrow');
      expect(tomorrowButton).toBeDefined();

      const laterThisWeekButton = screen.getByText('Later this week');
      expect(laterThisWeekButton).toBeDefined();

      const thisWeekendButton = screen.getByText('This weekend');
      expect(thisWeekendButton).toBeDefined();

      const nextWeekButton = screen.getByText('Next week');
      expect(nextWeekButton).toBeDefined();

      const calendar = screen.getByRole('grid');
      expect(calendar).toBeDefined();

      expect(popover.textContent).toContain('January 2024');

      vi.clearAllTimers();
      vi.useRealTimers();
    });
  });

  describe('Functionality', () => {
    const systemTime = new Date(Date.UTC(2024, 0, 1, 9, 0, 0)); // 01/01/2024 Monday

    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true });
      vi.setSystemTime(systemTime);
    });

    afterEach(() => {
      vi.clearAllTimers();
      vi.useRealTimers();
    });

    test('should set the date when a day button is clicked', async () => {
      const { result } = renderHook(() => useForm());
      const form = result.current;

      const screen = render((
        <Form {...form}>
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} onChange={(newDate) => {
                field.value = newDate;
                field.onChange(newDate);
              }}/>
              </FormControl>
            </FormItem>
          )}/>
        </Form>
      ));
      
      const calendarButton = screen.getByRole('button');
      calendarButton.click();

      const theFifth = await screen.findAllByRole('gridcell', { name: /5/i });
      theFifth[0].click();

      const calendarButtonWithDate = await screen.findByRole('button', { name: /January 5th, 2024/i });

      expect(calendarButtonWithDate.textContent).toBe('January 5th, 2024');
    });

    test('should clear the date when the same day is clicked', async () => {
      const { result } = renderHook(() => useForm());
      const form = result.current;

      const screen = render((
        <Form {...form}>
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} onChange={(newDate) => {
                field.value = newDate;
                field.onChange(newDate);
              }}/>
              </FormControl>
            </FormItem>
          )}/>
        </Form>
      ));
      
      const calendarButton = screen.getByRole('button');
      calendarButton.click();

      const theFifth = await screen.findAllByRole('gridcell', { name: /5/i });
      theFifth[0].click();

      const calendarButtonWithDate = await screen.findByRole('button', { name: /January 5th, 2024/i });

      expect(calendarButtonWithDate).toBeDefined();

      theFifth[0].click(); // click the selected date

      const calendarButtonWithoutDate = await screen.findByRole('button', { name: /Date/i });

      expect(calendarButtonWithoutDate.textContent).toBe('Date');
    });

    test('should clear the date when the clear button is clicked', async () => {
      const { result } = renderHook(() => useForm());
      const form = result.current;

      const screen = render((
        <Form {...form}>
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker date={field.value} onChange={(newDate) => {
                field.value = newDate;
                field.onChange(newDate);
              }}/>
              </FormControl>
            </FormItem>
          )}/>
        </Form>
      ));
      
      const calendarButton = screen.getByRole('button');
      calendarButton.click();

      const theFifth = await screen.findAllByRole('gridcell', { name: /5/i });
      theFifth[0].click();

      const calendarButtonWithDate = await screen.findByRole('button', { name: /January 5th, 2024/i });

      expect(calendarButtonWithDate).toBeDefined();

      const clearButton = await screen.findByLabelText('close');

      clearButton.click();

      const calendarButtonWithoutDate = await screen.findByRole('button', { name: /Date/i });

      expect(calendarButtonWithoutDate.textContent).toBe('Date');
    });
  });
});

