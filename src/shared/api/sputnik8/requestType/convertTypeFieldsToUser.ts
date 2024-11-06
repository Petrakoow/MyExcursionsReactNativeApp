export const getActivityTypeLabel = (type: string) => {
    switch (type) {
        case 'tour': return 'Excursion';
        case 'entry_ticket': return 'Entry Ticket';
        case 'transfer': return 'Transfer';
        case 'composite_activity': return 'Composite Activity';
        default: return 'Unknown';
    }
};

export const getTicketTypeLabel = (type: string) => {
    switch (type) {
        case 'group_tour, ticket_per_person': return 'Group Tour, Per Person';
        case 'private_tour, ticket_per_group': return 'Private Tour, Per Group';
        case 'private_tour, ticket_per_person': return 'Private Tour, Per Person';
        default: return 'Unknown';
    }
};

export const getPayTypeLabel = (type: string) => {
    switch (type) {
        case 'post_pay': return 'Pay on Spot';
        case 'deposit': return 'Deposit';
        case 'full_pay': return 'Full Payment';
        default: return 'Unknown';
    }
};

export const getProductTypeLabel = (type: string) => {
    switch (type) {
        case 'shared': return 'Shared Tour';
        case 'private': return 'Private Tour';
        default: return 'Unknown';
    }
};