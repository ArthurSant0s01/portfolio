export const caseStudies = {
  "planner-os": {
    featured: true,
    pt: {
      eyebrow: "Produtividade · Plataforma pessoal",
      intro: "Uma plataforma modular para organizar diferentes dimensões da vida num único sistema: produtividade, desenvolvimento pessoal, hábitos, saúde, finanças e objetivos.",
      problem: "A utilização de ferramentas separadas dificulta a visão integrada do progresso, obriga a alternar entre contextos e torna mais difícil transformar objetivos de longo prazo em ações consistentes.",
      objective: "Construir um ambiente pessoal centralizado, personalizável e extensível, com módulos independentes e uma experiência coerente em computador e telemóvel.",
      features: ["Command Center com visão geral do dia e indicadores de progresso", "Quests, objetivos, desafios, XP, níveis e conquistas", "Calendário e organização de atividades", "Diário para reflexões e registos pessoais", "Alter Egos para organizar personas e modos de atuação", "Acompanhamento de vícios e canalização de impulsos", "Módulo de treinos com planos, exercícios, favoritos e histórico", "Nutrição com cálculo energético, alimentos e macronutrientes", "Hidratação e acompanhamento de metas diárias", "Estudos através da integração conceptual com o Campus OS", "Finanças, hábitos, metas e estatísticas como módulos da plataforma", "Perfil, preferências, temas e gestão de dados"],
      architecture: ["Frontend: React, TypeScript, Vite e Tailwind CSS", "Backend e autenticação: Supabase", "Estado e persistência local-first com sincronização planeada", "Arquitetura modular para separar domínios funcionais", "Testes com Vitest nas áreas já cobertas"],
      status: "Em desenvolvimento. Vários módulos e mecanismos locais foram implementados, mas a sincronização integral com Supabase, a consolidação do módulo Estudos e a estabilização global ainda exigem trabalho. Não apresentar todos os módulos previstos como concluídos."
    },
    en: {
      eyebrow: "Productivity · Personal platform",
      intro: "A modular platform to organize different areas of life in one system: productivity, personal development, habits, health, finances and goals.",
      problem: "Separate tools make it difficult to maintain an integrated view of progress, switch between contexts and turn long-term goals into consistent actions.",
      objective: "Build a centralized, customizable and extensible personal workspace, with independent modules and a consistent desktop and mobile experience.",
      features: ["Command Center with daily overview and progress indicators", "Quests, goals, challenges, XP, levels and achievements", "Calendar and activity planning", "Journal for personal notes and reflections", "Alter Egos to organize personas and modes of action", "Habit and vice tracking with impulse redirection", "Workout plans, exercises, favourites and history", "Nutrition tools for energy, food and macronutrient tracking", "Hydration goals and daily tracking", "Studies through conceptual integration with Campus OS", "Finances, habits, goals and statistics as platform modules", "Profile, preferences, themes and data management"],
      architecture: ["Frontend: React, TypeScript, Vite and Tailwind CSS", "Backend and authentication: Supabase", "Local-first state and persistence with planned synchronization", "Modular architecture separating functional domains", "Vitest coverage in selected areas"],
      status: "In development. Several modules and local mechanisms have been implemented, but full Supabase synchronization, consolidation of the Studies module and overall stabilization remain in progress. Planned modules should not be presented as completed."
    }
  },
  "campus-os": {
    featured: true,
    pt: {
      eyebrow: "Educação · Planeamento académico",
      intro: "Um espaço de trabalho académico para reunir disciplinas, tarefas, horários, avaliações, materiais e sessões de estudo.",
      problem: "A informação académica dispersa por calendários, documentos e aplicações dificulta a priorização e a compreensão do trabalho necessário em cada semana.",
      objective: "Centralizar a organização universitária numa aplicação prática, responsiva e rápida, que ajude o estudante a planear e acompanhar o trabalho académico.",
      features: ["Dashboard com resumo de tarefas e atividade académica", "O meu dia para organizar o trabalho diário", "Prioridades para destacar tarefas importantes", "Criação e gestão de tarefas", "Modo Foco para sessões de concentração", "Gestão de disciplinas e informação curricular", "Horário semanal", "Testes e avaliações", "Materiais e apontamentos", "Calendário e planeamento", "Pesquisa rápida de páginas, disciplinas e tarefas", "Captura rápida e criação de tarefas", "Estatísticas e acompanhamento de progresso"],
      architecture: ["Frontend: React, TypeScript e Vite", "Interface: Tailwind CSS", "Backend e persistência: Supabase", "Testes: Vitest", "Motor de planeamento académico com regras de calendário e datas"],
      status: "Em desenvolvimento contínuo. A aplicação e vários fluxos estão implementados, mas a validação de todos os módulos, integrações e comportamentos de sincronização deve ser feita antes de os declarar concluídos."
    },
    en: {
      eyebrow: "Education · Academic planning",
      intro: "An academic workspace bringing together courses, tasks, timetables, assessments, materials and study sessions.",
      problem: "Academic information scattered across calendars, documents and apps makes prioritization and weekly workload planning harder.",
      objective: "Centralize university organization in a practical, responsive and fast application that helps students plan and track academic work.",
      features: ["Dashboard with task and academic activity overview", "My Day for daily planning", "Priorities for important tasks", "Task creation and management", "Focus mode for concentration sessions", "Course and curriculum management", "Weekly timetable", "Tests and assessments", "Materials and notes", "Calendar and planning", "Quick search across pages, courses and tasks", "Quick capture and task creation", "Statistics and progress tracking"],
      architecture: ["Frontend: React, TypeScript and Vite", "Interface: Tailwind CSS", "Backend and persistence: Supabase", "Tests: Vitest", "Academic planning engine with calendar and date rules"],
      status: "Under continuous development. The application and several flows are implemented, but all modules, integrations and synchronization behaviours must be validated before being described as complete."
    }
  },
  "empenho-original": {
    featured: true,
    pt: {
      eyebrow: "ERP · Construção civil",
      intro: "Um sistema de gestão para centralizar a operação de uma empresa de construção civil, com experiências distintas para gestão e funcionários.",
      problem: "A gestão de obras, funcionários, assiduidade e informação financeira exige processos claros. Uma interface complexa ou permissões mal definidas podem expor dados administrativos e dificultar o uso diário.",
      objective: "Desenhar um ERP completo, mas simples de utilizar, adaptado a pessoas com diferentes níveis de familiaridade tecnológica e com separação rigorosa de acessos.",
      features: ["Ambiente administrativo para gestão", "Ambiente simplificado para funcionários", "Gestão de obras e associação de atividade à obra atual", "Registo de eventos de ponto com confirmação da obra", "Observações associadas aos registos", "Histórico de assiduidade", "Configuração individual de remuneração e periodicidade", "Gestão operacional e consulta de informação", "Gestão documental prevista", "Auditoria de alterações sensíveis prevista"],
      architecture: ["Aplicações separadas para gestão e funcionários", "Backend partilhado com permissões distintas", "PostgreSQL através de Supabase", "Row Level Security (RLS) como fronteira de autorização", "Storage privado e políticas de acesso", "Histórico de auditoria para operações sensíveis"],
      status: "Em estruturação. A arquitetura e os requisitos estão definidos, mas a configuração completa do backend, as migrações, os testes RLS com contas reais e a validação legal/RGPD são pré-requisitos para produção. Não utilizar ainda para registos laborais oficiais."
    },
    en: {
      eyebrow: "ERP · Construction",
      intro: "A management system for a construction company, with separate experiences for management and employees.",
      problem: "Managing construction sites, employees, attendance and financial information requires clear processes. Complex interfaces or weak permissions can expose administrative data and make daily use harder.",
      objective: "Design a complete but easy-to-use ERP for people with different levels of technical confidence, with strict access separation.",
      features: ["Administrative management environment", "Simplified employee environment", "Construction-site management and assignment of current work location", "Time events with confirmation of the current site", "Notes attached to time records", "Attendance history", "Individual compensation and payment-period settings", "Operational management and information views", "Document management planned", "Audit trail for sensitive changes planned"],
      architecture: ["Separate management and employee applications", "Shared backend with distinct permissions", "PostgreSQL through Supabase", "Row Level Security (RLS) as the authorization boundary", "Private Storage and access policies", "Audit trail for sensitive operations"],
      status: "In specification and initial structuring. Full backend setup, migrations, RLS testing with real role accounts and legal/GDPR validation are prerequisites for production. Not yet suitable for official employment time records."
    }
  },
  "ssdoces": {
    featured: true,
    pt: {
      eyebrow: "Comércio eletrónico · Alimentação",
      intro: "Uma loja online para uma marca de brigadeiros gourmet artesanais, concebida para apresentar produtos e estruturar a experiência de encomenda.",
      problem: "A marca precisava de uma montra digital organizada, com navegação de produtos e um percurso de compra claro, além de ferramentas de gestão.",
      objective: "Criar uma experiência de e-commerce responsiva que reúna descoberta de produtos, carrinho, checkout e áreas de cliente e administração.",
      features: ["Catálogo e apresentação de produtos", "Pesquisa e filtros", "Lista de favoritos", "Carrinho de compras com persistência", "Fluxo de checkout", "Estrutura de área de cliente", "Painel administrativo", "Estrutura de autenticação", "Integração com Supabase"],
      architecture: ["Frontend: React, TypeScript e Vite", "Estilos: Tailwind CSS", "Estado do cliente: Zustand", "Backend e dados: Supabase", "Configuração de variáveis de ambiente para integrações externas"],
      status: "Projeto desenvolvido com estrutura de loja, carrinho, checkout e áreas de gestão. A disponibilidade atual do deployment e a integração de pagamentos, notificações e operações de produção devem ser verificadas separadamente."
    },
    en: {
      eyebrow: "E-commerce · Food",
      intro: "An online store for an artisan gourmet brigadeiro brand, designed to present products and structure the ordering experience.",
      problem: "The brand needed an organized digital storefront, product discovery and a clear purchase journey, alongside management tools.",
      objective: "Create a responsive e-commerce experience bringing together product discovery, cart, checkout and customer and administration areas.",
      features: ["Product catalogue and presentation", "Search and filters", "Favourites list", "Persistent shopping cart", "Checkout flow", "Customer-area structure", "Admin dashboard", "Authentication structure", "Supabase integration"],
      architecture: ["Frontend: React, TypeScript and Vite", "Styling: Tailwind CSS", "Client state: Zustand", "Backend and data: Supabase", "Environment-variable configuration for external integrations"],
      status: "Developed with store, cart, checkout and management structures. Current deployment availability and production integrations for payments, notifications and operations should be verified separately."
    }
  },
  "primecode": {
    featured: true,
    pt: {
      eyebrow: "Agência digital · Desenvolvimento web",
      intro: "Uma presença digital bilingue para uma agência focada em desenvolvimento web e soluções personalizadas para empresas.",
      problem: "Uma agência precisa de explicar os seus serviços, demonstrar trabalho e converter visitantes interessados em contactos qualificados.",
      objective: "Construir um website comercial com comunicação PT/EN, apresentação de serviços, portfólio e canais de contacto.",
      features: ["Website institucional", "Conteúdo em português e inglês", "Apresentação de serviços", "Portfólio de projetos", "Perguntas frequentes", "Formulários de contacto", "Estrutura de newsletter", "Preparação de envio de emails", "SEO e estrutura responsiva"],
      architecture: ["Frontend: React e JavaScript", "Estilos: Tailwind CSS", "Backend preparado com FastAPI", "Base de dados: MongoDB", "Envio de email: Resend", "Deployment: Vercel"],
      status: "Website publicado. A operação de formulários, newsletter e entrega de emails depende da configuração e validação dos serviços externos correspondentes."
    },
    en: {
      eyebrow: "Digital agency · Web development",
      intro: "A bilingual digital presence for an agency focused on web development and tailored business solutions.",
      problem: "An agency needs to explain its services, demonstrate work and turn interested visitors into qualified enquiries.",
      objective: "Build a commercial website with PT/EN communication, service presentation, portfolio and contact channels.",
      features: ["Agency website", "Portuguese and English content", "Service presentation", "Project portfolio", "FAQ", "Contact forms", "Newsletter structure", "Email delivery preparation", "SEO and responsive structure"],
      architecture: ["Frontend: React and JavaScript", "Styling: Tailwind CSS", "Backend prepared with FastAPI", "Database: MongoDB", "Email delivery: Resend", "Deployment: Vercel"],
      status: "Website published. Forms, newsletter and email delivery depend on the configuration and validation of their external services."
    }
  },
  "real-estate": {
    featured: false,
    pt: { eyebrow: "Experiência web · Imobiliário", intro: "Uma experiência frontend de apresentação imobiliária com direção visual premium.", problem: "Explorar uma apresentação digital mais editorial e sofisticada para propriedades e arquitetura.", objective: "Construir uma interface visualmente consistente e responsiva para demonstrar composição, hierarquia e desenvolvimento frontend.", features: ["Estrutura de website imobiliário", "Composição editorial", "Componentes responsivos", "Hierarquia visual e apresentação de propriedades", "Animações e microinterações"], architecture: ["Next.js e React", "TypeScript", "Tailwind CSS", "Motion"], status: "Projeto de showcase frontend. Não está documentada uma integração com inventário imobiliário, CRM ou backend de reservas." },
    en: { eyebrow: "Web experience · Real estate", intro: "A real-estate presentation frontend with a premium visual direction.", problem: "Explore a more editorial and sophisticated digital presentation for properties and architecture.", objective: "Build a consistent, responsive interface demonstrating composition, hierarchy and frontend development.", features: ["Real-estate website structure", "Editorial composition", "Responsive components", "Visual hierarchy and property presentation", "Animations and microinteractions"], architecture: ["Next.js and React", "TypeScript", "Tailwind CSS", "Motion"], status: "Frontend showcase project. No property inventory, CRM or booking backend integration is documented." }
  },
  "golden-archways": {
    featured: false,
    pt: { eyebrow: "Experiência web · Direção visual", intro: "Um projeto de exploração visual que traduz uma identidade premium numa experiência web.", problem: "Experimentar uma linguagem visual distintiva e aplicá-la numa interface digital coerente.", objective: "Desenvolver uma apresentação visual com componentes reutilizáveis e estrutura responsiva.", features: ["Direção visual e identidade gráfica", "Composição de layouts", "Componentização", "Estrutura responsiva", "Apresentação de conteúdos visuais"], architecture: ["React", "TypeScript", "TanStack", "Vite", "Tailwind CSS"], status: "Projeto de showcase. Funcionalidades de negócio ou integrações adicionais não estão documentadas." },
    en: { eyebrow: "Web experience · Visual direction", intro: "A visual exploration project translating a premium identity into a web experience.", problem: "Experiment with a distinctive visual language and apply it to a coherent digital interface.", objective: "Develop a visual showcase with reusable components and responsive structure.", features: ["Visual direction and graphic identity", "Layout composition", "Componentization", "Responsive structure", "Visual content presentation"], architecture: ["React", "TypeScript", "TanStack", "Vite", "Tailwind CSS"], status: "Showcase project. Additional business features or integrations are not documented." }
  },
  "episten-assistent": {
    featured: false,
    pt: { eyebrow: "Inteligência artificial · Experimentação", intro: "Um espaço experimental para explorar a estrutura de um assistente pessoal de IA baseado no ecossistema OpenJarvis.", problem: "Investigar como organizar componentes de um assistente inteligente num projeto modular e extensível.", objective: "Explorar uma base técnica em Python para experimentar modelos e ferramentas de IA.", features: ["Estrutura modular de projeto", "Ambiente Python", "Exploração de modelos de linguagem", "Experimentação com ferramentas e integrações"], architecture: ["Python", "Base de projeto relacionada com OpenJarvis", "Organização modular"], status: "Projeto experimental. Memória persistente, execução autónoma, controlo do computador e integrações externas não estão confirmados como funcionalidades implementadas." },
    en: { eyebrow: "Artificial intelligence · Experimentation", intro: "An experimental workspace exploring a personal AI assistant based on the OpenJarvis ecosystem.", problem: "Investigate how to organize intelligent-assistant components in a modular and extensible project.", objective: "Explore a Python technical foundation for experimenting with AI models and tools.", features: ["Modular project structure", "Python environment", "Language-model exploration", "Experimentation with tools and integrations"], architecture: ["Python", "OpenJarvis-related project foundation", "Modular organization"], status: "Experimental project. Persistent memory, autonomous execution, computer control and external integrations are not confirmed as implemented features." }
  },
  "eurorail": {
    featured: false,
    pt: { eyebrow: "Projeto académico · Algoritmia", intro: "Um protótipo académico de reservas ferroviárias desenvolvido em Flowgorithm.", problem: "Modelar um processo de reserva com disponibilidade de lugares, categorias e validação de passageiros.", objective: "Aplicar fundamentos de algoritmia para representar e testar um fluxo de reserva.", features: ["Inicialização de lugares", "Consulta de disponibilidade", "Seleção e validação de lugar", "Categorias de lugares", "Suplemento para lugar premium", "Confirmação de reserva"], architecture: ["Flowgorithm", "Variáveis e arrays", "Ciclos e condições", "Lógica de validação"], status: "Protótipo testado num cenário de reserva premium. Suporte a múltiplas reservas e cenários adicionais ainda requer desenvolvimento." },
    en: { eyebrow: "Academic project · Algorithms", intro: "An academic railway reservation prototype built in Flowgorithm.", problem: "Model a reservation process with seat availability, categories and passenger validation.", objective: "Apply algorithmic fundamentals to represent and test a reservation flow.", features: ["Seat initialization", "Availability lookup", "Seat selection and validation", "Seat categories", "Premium-seat surcharge", "Reservation confirmation"], architecture: ["Flowgorithm", "Variables and arrays", "Loops and conditionals", "Validation logic"], status: "Tested as a premium-seat reservation scenario. Multiple reservations and additional scenarios still require development." }
  }
  ,"portfolio": {
    featured: false,
    pt: { eyebrow: "Marca pessoal · Desenvolvimento web", intro: "O website que reúne a minha identidade profissional, projetos, competências e canais de contacto.", problem: "Precisava de uma presença profissional central para apresentar trabalho, percurso e serviços.", objective: "Construir um portfólio bilingue, responsivo e preparado para crescer com novos projetos.", features: ["Página inicial e apresentação pessoal", "Sobre, percurso e competências", "Catálogo de projetos e estudos de caso", "Secções de fotografia, videografia e IA", "Currículo e descarregamento de CV", "Formulário e canais de contacto", "Conteúdo em português e inglês", "SEO e navegação responsiva"], architecture: ["React e TypeScript", "Vite e Tailwind CSS", "Framer Motion", "Internacionalização PT/EN", "Deployment na Vercel"], status: "Publicado. Conteúdo, ligações externas e integrações de contacto devem ser revistos periodicamente." },
    en: { eyebrow: "Personal brand · Web development", intro: "The website bringing together my professional identity, projects, skills and contact channels.", problem: "I needed a central professional presence to present my work, background and services.", objective: "Build a bilingual, responsive portfolio that can grow with new projects.", features: ["Home page and personal introduction", "About, journey and skills", "Project catalogue and case studies", "Photography, videography and AI sections", "Resume and CV download", "Contact form and communication channels", "Portuguese and English content", "SEO and responsive navigation"], architecture: ["React and TypeScript", "Vite and Tailwind CSS", "Framer Motion", "PT/EN internationalization", "Vercel deployment"], status: "Published. Content, external links and contact integrations should be reviewed periodically." }
  }
};