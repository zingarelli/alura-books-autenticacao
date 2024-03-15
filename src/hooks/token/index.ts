export const usePersistirToken = () => (token:string) => sessionStorage.setItem('token', token)

export const useGetToken = () => sessionStorage.getItem('token')

export const useLimparToken = () => () => sessionStorage.removeItem('token')