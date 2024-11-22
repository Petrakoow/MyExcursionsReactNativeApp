export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const formatPhoneNumber = (phone: string) => {
    let normalizedPhone = phone.replace(/\D/g, ''); 
    if (normalizedPhone.startsWith('8')) {
        normalizedPhone = '7' + normalizedPhone.slice(1); 
    }
    if (!normalizedPhone.startsWith('7')) {
        normalizedPhone = '7' + normalizedPhone;
    }
    return `+${normalizedPhone[0]}(${normalizedPhone.slice(1, 4)})${normalizedPhone.slice(4, 7)}-${normalizedPhone.slice(7, 9)}-${normalizedPhone.slice(9)}`;
};
