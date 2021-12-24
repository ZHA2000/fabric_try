<template>
    <div class="fabric">
        <div class="signature-box">
            <div class="signature-canvas">
                <canvas
                    id="signature"
                    width="700"
                    height="400"
                ></canvas>
            </div>
            <el-divider>
                <i class="el-icon-setting"></i>
            </el-divider>

            <div class="signature-btn">
                <el-form
                    :model="brushConfig"
                    ref="form"
                    label-width="80px"
                    size="small"
                    class="btn-group"
                    :inline="true"
                >
                    <el-form-item label="颜色：">
                        <el-color-picker
                            show-alpha
                            v-model="brushConfig.color"
                        ></el-color-picker>
                    </el-form-item>
                    <el-form-item label="粗细(px)：">
                        <el-slider
                            :min=1
                            v-model="brushConfig.width"
                        ></el-slider>
                    </el-form-item>
                    <el-form-item style="margin-left:10px">
                        <el-button
                            type="success"
                            @click="exportImage"
                        >导出<i class="el-icon-download el-icon--right"></i></el-button>
                        <el-tooltip
                            content="清空画布"
                            placement="top"
                            effect="dark"
                        >
                            <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="clearCanvas"
                            ></el-button>
                        </el-tooltip>
                    </el-form-item>

                </el-form>

            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import { fabric } from 'fabric';
import download from 'downloadjs';
import _ from 'lodash';


@Component({
    name: '',
    components: {

    }
})
export default class FabricDemo extends Vue {
    // 暂未找到fabricjs类型声明
    canvas: any;

    brushConfig = {
        color: '#170C00',
        width: 5
    }

    @Watch('brushConfig', { deep: true })
    brushChange() {
        _.assign(this.canvas.freeDrawingBrush, this.brushConfig)
    }

    mounted() {
        this.canvas = new fabric.Canvas('signature', {
            isDrawingMode: true,
        });
    }

    clearCanvas() {
        this.canvas?.clear();
    }

    exportImage() {
        const dataURL = this.canvas.toDataURL({
            width: this.canvas.width,
            height: this.canvas.height,
            left: 0,
            top: 0,
            format: 'png',
        });
        download(dataURL, 'signature.png', 'image/png')
    }
}
</script>

<style lang='less' scoped>
.fabric {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
    .signature-box {
        width: 700px;
        height: 480px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .signature-canvas {
            height: 400px;
        }
        .el-divider {
            width: 95%;
            margin: 0 auto;
        }
        .signature-btn {
            padding: 20px;
            .el-slider {
                width: 300px;
            }
        }
    }
}
</style>