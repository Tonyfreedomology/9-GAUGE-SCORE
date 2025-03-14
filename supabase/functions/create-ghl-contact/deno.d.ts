// Type definitions for Deno API
declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    toObject(): { [key: string]: string };
  }
  
  export const env: Env;
  
  export interface ConnInfo {
    readonly localAddr: Deno.Addr;
    readonly remoteAddr: Deno.Addr;
  }
  
  export interface Addr {
    transport: "tcp" | "udp";
    hostname: string;
    port: number;
  }
}

// Type definitions for HTTP server module
declare module "https://deno.land/std@0.177.0/http/server.ts" {
  export interface ServeInit {
    port?: number;
    hostname?: string;
    handler: (request: Request, connInfo?: Deno.ConnInfo) => Response | Promise<Response>;
    onError?: (error: unknown) => Response | Promise<Response>;
    signal?: AbortSignal;
  }

  export type Handler = (request: Request, connInfo?: Deno.ConnInfo) => Response | Promise<Response>;

  export function serve(handler: Handler, options?: Omit<ServeInit, "handler">): void;
  export function serve(options: ServeInit): void;
}
