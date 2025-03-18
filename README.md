# ScoutCalendar

O **ScoutCalendar** é uma aplicação web desenvolvida para auxiliar grupos escoteiros na organização e visualização de eventos e atividades. Com um calendário interativo e personalizável, os usuários podem filtrar eventos por ramo (lobinho, escoteiro, sênior, pioneiro), visualizar detalhes como data, localização e descrição, e integrar um mapa para facilitar o planejamento de deslocamentos.

## Funcionalidades Principais

- **Calendário Interativo:** Visualize todos os eventos agendados em um calendário moderno e fácil de usar.
- **Filtros por Ramo:** Filtre eventos por ramo (lobinho, escoteiro, sênior, pioneiro) para visualizar apenas os eventos relevantes.
- **Mapa de Eventos:** Integração com Google Maps para visualizar a localização dos eventos.
- **Notificações:** Receba lembretes por e-mail ou push notifications sobre eventos próximos.
- **Gerenciamento de Eventos:** Chefes e líderes podem adicionar, editar ou excluir eventos.
- **Autenticação e Controle de Acesso:**
  - Uso do Firebase Authentication para gerenciar usuários.
  - Níveis de permissão (ex.: membros podem visualizar eventos, líderes podem criar/editar/excluir).
- **Compartilhamento e Integração:**
  - Exportação de eventos para Google Calendar.
  - Link de compartilhamento para eventos específicos.
- **Modo Offline:**
  - Cache dos eventos para acesso offline.
  - Sincronização automática quando houver internet.

## Tecnologias Utilizadas

### Front-end
- **Angular** - Framework para construção da interface do usuário.
- **Angular Material** - Biblioteca de componentes UI para design moderno.
- **Google Maps API** - Integração de mapas para visualização de localizações.

### Back-end
- **Node.js** - Ambiente de execução para o servidor.
- **Express** - Framework para criação da API.
- **Firebase** - Banco de dados NoSQL para armazenamento de eventos e usuários.

