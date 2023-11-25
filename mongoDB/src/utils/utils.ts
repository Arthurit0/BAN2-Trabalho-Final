function updateIfDiff(orig: any, updt: any) {
    return updt && orig !== updt ? updt : orig;
}

export { updateIfDiff };
