import { atom } from "jotai";
type ProjectReqData = {
    postedByName?: string,
    postedById?: number,
    isNearby?: boolean,
}
const projectReqDataAtom = atom<ProjectReqData>({ postedByName: '', postedById: 0, isNearby: false })
export  {projectReqDataAtom}