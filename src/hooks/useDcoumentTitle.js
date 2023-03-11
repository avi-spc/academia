import { useEffect } from "react";

export const useDocumentTitle = (documentTitle) => {
    useEffect(() => {
        document.title = documentTitle === '' ? 'academia' : `${documentTitle} · academia`;
    });
};