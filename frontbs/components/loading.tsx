import { FC } from 'react'

type Props = {
  loading: boolean
}

export const Loading: FC<Props> = (props) => {

  const loading = props.loading;

  return (
    <div>
      {loading === true ?
        <div>
          <div id="loading" className="loading">
            <div className="circle"></div>
          </div>
        </div>
      : null}
    </div>
  )
}
