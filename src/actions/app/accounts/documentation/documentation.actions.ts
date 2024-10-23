import { useQuery } from "@tanstack/react-query";
import {
    Pais,
    PaisesPaginatedRes,
} from '@/shared/interfaces';
import { handleAxiosError } from '@/shared/axios';
import { getUrlParams } from '@/shared/utils';
import { erpAPI } from '@/shared/axios/erp-api';
const { get } = erpAPI();
export type GetPaisesParams = Partial<Pais> & {
    page?: number;
    page_size?: number;
    filterByState?: boolean;
};
export const getPais = async (uuid: string) => {
    try {
        return await get<Pais>(`/pais/${uuid}`, true);
    } catch (error) {
        handleAxiosError(error);
    }
};
export const getPaises = async (params?: GetPaisesParams) => {
    const stateParams = { ...params };
    // filter by state
    if (stateParams.filterByState === false && stateParams.state === undefined) {
        delete stateParams.state;
    } else if (stateParams.filterByState !== false) {
        stateParams.state = true;
    }
    delete stateParams.filterByState;
    const queryParams = getUrlParams(stateParams);
    return get<PaisesPaginatedRes>(`/pais/?${queryParams}`, true);
};
export const useGetPais = (uuid: string) => {
    return useQuery({
        queryKey: ['pais', uuid],
        queryFn: () => getPais(uuid),
        retry: false,
    });
};