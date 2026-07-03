/**
 * Testing Utilities
 *
 * Shared test helpers to reduce boilerplate across unit tests.
 * Provides mock factories, signal testing utilities, and common setup patterns.
 */

import { signal, WritableSignal, Signal } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

/**
 * Creates a writable signal for testing purposes.
 * Use when you need to set signal values in tests without readonly constraints.
 */
export function createTestSignal<T>(initialValue: T): WritableSignal<T> {
  return signal(initialValue);
}

/**
 * Reads the current value of a signal synchronously.
 * Works with both Signal<T> and WritableSignal<T>.
 */
export function readSignal<T>(s: Signal<T>): T {
  return s();
}

/**
 * Provides common testing providers for component tests.
 */
export function provideTestingProviders(routes: unknown[] = []) {
  return [
    provideHttpClient(withInterceptors([])),
    provideHttpClientTesting(),
    provideRouter(routes as never[]),
    provideLocationMocks()
  ];
}

/**
 * Triggers change detection and returns a stable fixture.
 */
export async function stableFixture<T>(fixture: ComponentFixture<T>): Promise<ComponentFixture<T>> {
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

/**
 * Queries the fixture's native element for a CSS selector.
 */
export function queryByCss<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement | null {
  return fixture.nativeElement.querySelector(selector);
}

/**
 * Queries the fixture's native element for all elements matching a CSS selector.
 */
export function queryAllByCss<T>(fixture: ComponentFixture<T>, selector: string): HTMLElement[] {
  return Array.from(fixture.nativeElement.querySelectorAll(selector));
}

/**
 * Queries the fixture for text content in any element.
 */
export function queryByText<T>(fixture: ComponentFixture<T>, text: string): HTMLElement | null {
  const elements: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('*'));
  return elements.find(el => el.textContent?.trim().includes(text)) ?? null;
}

/**
 * Simulates a click event on an element.
 */
export function clickElement(element: HTMLElement): void {
  element.click();
  element.dispatchEvent(new Event('click'));
}
