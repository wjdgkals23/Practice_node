- async 라이브러리
    - javascript nodejs에서 비동기 코드 처리 솔루션
    - 작업의 단순화를 진행시켜주며, 다양한 콜렉션들을 비동기적으로 처리할 수 있게 해준다.

    (spiderver2) -> 업무의 흐름을 가진 구조 학습
    - series
        - 업무의 흐름대로 가게 해주는 헬퍼
        - 각 테스크의 마지막에 있는 인자인 callback은 다음 업무를 가르킨다.
        => series의 특성을 이용해 하나의 업무가 마무리되었을 때 콜백형식으로 다음 업무를 수행한다.
    - eachSeries
        - 일련의 집합을 반복해야하는 상황일 경우 유용한 헬퍼

    (spiderver3) -> 업무의 병렬 진행
    - each // map,filter,detect,some,every,concat 등등
        - 병렬흐름을 관리하는 대표적인 함수(헬퍼)

    (spiderver4) -> 업무의 동시성 제한 진행 => 최대 가능한 업무를 한번에 생성하고 이후에는 공간이 날때 마다 남은 업무를 수행
    - queue
        - 제한된 병렬 실행을 진행할 수 있는 함수
        - dq = async.queue(업무 비동기 함수,동시성 제한 수)
        - dq.push(data, callback)


