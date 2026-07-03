import { TestBed } from '@angular/core/testing';

import { RuntimeConfigService } from './runtime-config.service';
import { DEFAULT_RUNTIME_CONFIG } from '../models';

describe('RuntimeConfigService', () => {
  let service: RuntimeConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuntimeConfigService]
    });
    service = TestBed.inject(RuntimeConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default config initially', () => {
    expect(service.config()).toEqual(DEFAULT_RUNTIME_CONFIG);
  });

  it('should not be marked as loaded initially', () => {
    expect(service.loaded).toBe(false);
  });

  it('should provide shorthand apiUrl getter', () => {
    expect(service.apiUrl).toBe(DEFAULT_RUNTIME_CONFIG.apiUrl);
  });

  it('should provide shorthand production getter', () => {
    expect(service.production).toBe(DEFAULT_RUNTIME_CONFIG.production);
  });

  it('should provide shorthand logLevel getter', () => {
    expect(service.logLevel).toBe(DEFAULT_RUNTIME_CONFIG.logLevel);
  });

  it('should provide shorthand baseUrl getter', () => {
    expect(service.baseUrl).toBe(DEFAULT_RUNTIME_CONFIG.baseUrl);
  });

  it('should provide shorthand appTitle getter', () => {
    expect(service.appTitle).toBe(DEFAULT_RUNTIME_CONFIG.appTitle);
  });

  it('should load config from assets', async () => {
    const mockConfig = {
      ...DEFAULT_RUNTIME_CONFIG,
      apiUrl: 'https://api.example.com',
      appTitle: 'Custom App Title'
    };

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify(mockConfig), { status: 200 }))
    );

    await service.load();

    expect(service.loaded).toBe(true);
    expect(service.config().apiUrl).toBe('https://api.example.com');
    expect(service.config().appTitle).toBe('Custom App Title');
  });

  it('should fall back to defaults on fetch error', async () => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.reject(new Error('Network error'))
    );

    await service.load();

    expect(service.loaded).toBe(true);
    expect(service.config()).toEqual(DEFAULT_RUNTIME_CONFIG);
  });

  it('should fall back to defaults on non-200 response', async () => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(null, { status: 404 }))
    );

    await service.load();

    expect(service.loaded).toBe(true);
    expect(service.config()).toEqual(DEFAULT_RUNTIME_CONFIG);
  });

  it('should merge loaded config with defaults', async () => {
    const partialConfig = {
      apiUrl: 'https://api.custom.com'
    };

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify(partialConfig), { status: 200 }))
    );

    await service.load();

    const config = service.config();
    expect(config.apiUrl).toBe('https://api.custom.com');
    expect(config.appTitle).toBe(DEFAULT_RUNTIME_CONFIG.appTitle);
  });

  it('should mark loaded=true even on error', async () => {
    spyOn(window, 'fetch').and.returnValue(
      Promise.reject(new Error('Error'))
    );

    await service.load();

    expect(service.loaded).toBe(true);
  });

  it('should expose readonly config signal', () => {
    const config = service.config;
    expect(typeof config).toBe('function');
    expect(config()).toBeDefined();
  });
});
