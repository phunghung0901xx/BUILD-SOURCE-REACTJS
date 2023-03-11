import { FC, memo } from 'react'
import { isEqual } from 'lodash'
import { Spin } from 'antd'


type LoadingFallbackProps = {
    asOverlay?: boolean
    fullscreen?: boolean
}

const LoadingFallback: FC<LoadingFallbackProps> = (props) => {
    const { asOverlay, fullscreen } = props

    return (
        <>
            <div className="">
                <Spin size="large" spinning />
            </div>
        </>
    )
}

export default memo(LoadingFallback, (prevProps, nextProps) => isEqual(prevProps, nextProps))
