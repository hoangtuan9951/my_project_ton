import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import Counter from "@/contracts/counter";
import { Address, OpenedContract } from "@ton/core";

export function useCounterContract() {
    const client = useTonClient();
    const [val, setVal] = useState<null | number>();

    const counterContract = useAsyncInitialize(async ()=> {
        if (!client) return;
        const contract  = new Counter(Address.parse("UQCt1hcGvOCOi7-ohz_Wk-hMwPEm0Yw8EmUbXzi_PDxbCOhs"))
        return client.open(contract) as OpenedContract<Counter>;
    }, [client]);

    useEffect(()=> {
        async function getValue() {
            if (!counterContract) return;
            setVal(null)
            const val = await counterContract.getCounter();
            setVal(Number(val));
        }
        getValue();
    }, [counterContract]);

    return {
        value: val,
        address: counterContract?.address.toString(),
    };
}