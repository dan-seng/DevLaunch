interface FrameworkResult {
  frontend: string | null;
  backend: string | null;
  database: string | null;
  authentication: string | null;
  deployment: string | null;
}

interface DetectionRule {
  pattern: RegExp;
  framework: string;
  category: keyof FrameworkResult;
}

const RULES: DetectionRule[] = [
  // Frontend — specific frameworks first so they win over generic ones
  { pattern: /next\.config/i, framework: "Next.js", category: "frontend" },
  { pattern: /"next"/i, framework: "Next.js", category: "frontend" },
  { pattern: /nuxt\.config/i, framework: "Nuxt", category: "frontend" },
  { pattern: /"nuxt"/i, framework: "Nuxt", category: "frontend" },
  { pattern: /"@remix-run\/react"/i, framework: "Remix", category: "frontend" },
  { pattern: /"gatsby"/i, framework: "Gatsby", category: "frontend" },
  { pattern: /vite\.config/i, framework: "Vite", category: "frontend" },
  { pattern: /"@angular\/core"/i, framework: "Angular", category: "frontend" },
  { pattern: /"react"/i, framework: "React", category: "frontend" },
  { pattern: /"vue"/i, framework: "Vue", category: "frontend" },
  { pattern: /"svelte"/i, framework: "Svelte", category: "frontend" },

  // Backend
  { pattern: /"express"/i, framework: "Express", category: "backend" },
  { pattern: /"@nestjs\/core"/i, framework: "NestJS", category: "backend" },
  { pattern: /"fastify"/i, framework: "Fastify", category: "backend" },
  { pattern: /from\s+flask/i, framework: "Flask", category: "backend" },
  { pattern: /django\.conf/i, framework: "Django", category: "backend" },
  { pattern: /spring-boot/i, framework: "Spring Boot", category: "backend" },
  { pattern: /dropwizard/i, framework: "Dropwizard", category: "backend" },
  { pattern: /actix/i, framework: "Actix", category: "backend" },
  { pattern: /"axios"/i, framework: "Axios", category: "backend" },

  // Database
  { pattern: /"mongoose"/i, framework: "MongoDB / Mongoose", category: "database" },
  { pattern: /"prisma"/i, framework: "Prisma", category: "database" },
  { pattern: /"typeorm"/i, framework: "TypeORM", category: "database" },
  { pattern: /"drizzle-orm"/i, framework: "Drizzle ORM", category: "database" },
  { pattern: /"pg"/i, framework: "PostgreSQL", category: "database" },
  { pattern: /"redis"/i, framework: "Redis", category: "database" },
  { pattern: /sqlalchemy/i, framework: "SQLAlchemy", category: "database" },

  // Auth
  { pattern: /"next-auth"/i, framework: "NextAuth.js", category: "authentication" },
  { pattern: /"@clerk\/nextjs"/i, framework: "Clerk", category: "authentication" },
  { pattern: /"@auth\/core"/i, framework: "Auth.js", category: "authentication" },
  { pattern: /passport/i, framework: "Passport", category: "authentication" },
  { pattern: /devise/i, framework: "Devise", category: "authentication" },

  // Deployment
  { pattern: /Dockerfile/i, framework: "Docker", category: "deployment" },
  { pattern: /docker-compose/i, framework: "Docker Compose", category: "deployment" },
  { pattern: /\.github\/workflows/i, framework: "GitHub Actions", category: "deployment" },
  { pattern: /Jenkinsfile/i, framework: "Jenkins", category: "deployment" },
  { pattern: /\bvercel\.json\b/i, framework: "Vercel", category: "deployment" },
  { pattern: /\bnetlify\.toml\b/i, framework: "Netlify", category: "deployment" },
];

export function detectFramework(files: string[]): FrameworkResult {
  const result: FrameworkResult = {
    frontend: null,
    backend: null,
    database: null,
    authentication: null,
    deployment: null,
  };

  const fileContent = files.join("\n");

  for (const rule of RULES) {
    if (rule.pattern.test(fileContent)) {
      if (!result[rule.category]) {
        result[rule.category] = rule.framework;
      }
    }
  }

  return result;
}

export function parsePackageJson(content: string): Record<string, string> {
  try {
    const pkg = JSON.parse(content);
    return { ...pkg.dependencies, ...pkg.devDependencies };
  } catch {
    return {};
  }
}
