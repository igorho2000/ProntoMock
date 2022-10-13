function DistributeVertical() {
    if (selectedItemStats.length === 2) {
        return
    }
    const totalElements = selectedItemStats.length;
    const sortByTop = selectedItemStats.sort((a, b) => a.visualTop > b.visualTop ? 1 : -1);
    const TopBound = sortByTop.shift();
    const sortByBottom = sortByTop.sort((a, b) => a.visualBottom > b.visualBottom ? -1 : 1);
    const BottomBound = sortByBottom.shift();
    const sortByCenter = sortByBottom.sort((a, b) => a.centerTop > b.centerTop ? 1 : -1);
    var newCenters = []
    for (let i = 0; i < totalElements; i++) {
        newCenters[i] = TopBound.centerTop + ((BottomBound.centerTop - TopBound.centerTop) / (totalElements - 1)) * i
    }
    sortByCenter.unshift(TopBound);
    sortByCenter.push(BottomBound);
    for (let i = 0; i < totalElements; i++) {
        sortByCenter[i].centerTop = newCenters[i];
        sortByCenter[i].visualTop = newCenters[i] - sortByCenter[i].visualHeight / 2
    }
    const toOutput = sortByCenter.sort((a, b) => a.index > b.index ? 1 : -1);
    const output = toOutput.map((item) => (item.visualTop + item.heightDif))
    dispatch(ChangeEachSelectedProperties(['y', output]));
    dispatch(SaveDraft());
}