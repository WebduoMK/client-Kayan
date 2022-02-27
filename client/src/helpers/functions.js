export const formatNumber = (value, args) => {
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];

    if (!value) {
        return null;
    }

    if (Number.isNaN(value)) {
        return null;
    }

    if (value < 1000) {
        return value;
    }

    const exp = Math.floor(Math.log(value) / Math.log(1000));

    return (value / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
}
