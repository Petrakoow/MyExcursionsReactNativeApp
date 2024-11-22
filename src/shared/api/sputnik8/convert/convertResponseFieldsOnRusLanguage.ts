const UNKNOWN = 'Данные отсутствуют';

export const ActivityTypeLabels = {
    tour: 'Экскурсия',
    entry_ticket: 'Только входной билет',
    transfer: 'Трансфер',
    composite_activity: 'Сборная экскурсия',
};

export const TicketTypeLabels = {
    'group_tour, ticket_per_person':
        'Билет на групповую сборную экскурсию, цена за каждого человека',
    'private_tour, ticket_per_group':
        'Билет для частных групп, цена за всю группу',
    'private_tour, ticket_per_person':
        'Индивидуальная экскурсия, цена за одного человека',
};

export const PayTypeLabels = {
    post_pay: 'Оплата на месте',
    deposit: 'Частичная предоплата',
    full_pay: 'Полная предоплата',
};

export const ProductTypeLabels = {
    shared: 'Групповая, сборная',
    private: 'Индивидуальная',
};

export const getActivityTypeLabel = (type: keyof typeof ActivityTypeLabels) =>
    ActivityTypeLabels[type] || UNKNOWN;

export const getTicketTypeLabel = (type: keyof typeof TicketTypeLabels) =>
    TicketTypeLabels[type] || UNKNOWN;

export const getPayTypeLabel = (type: keyof typeof PayTypeLabels) =>
    PayTypeLabels[type] || UNKNOWN;

export const getProductTypeLabel = (type: keyof typeof ProductTypeLabels) =>
    ProductTypeLabels[type] || UNKNOWN;
