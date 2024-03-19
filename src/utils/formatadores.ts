export const formataMoeda = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });

export const formataData = (data: Date) => {
    const timezoneOffset = data.getTimezoneOffset()
    data.setMinutes(data.getMinutes() + timezoneOffset)
    return data.toLocaleDateString()
}