export const createCommonLine = (params: object) => {
    const isObjEmpty = Object.keys(params).length <= 0;
    if (isObjEmpty) return '';
    return Object.values(params).join(', ');
};
