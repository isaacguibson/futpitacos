package com.guibsonsoftwares.futpitacos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "produto_virtual", schema = "dbo")
public class ProdutoVirtual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 255)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "id_tipo_moeda", nullable = false, length = 255)
    private TipoMoedaEnum tipoMoeda;

    @Enumerated(EnumType.STRING)
    @Column(name = "id_tipo_produto", nullable = false, length = 255)
    private TipoProdutoEnum tipoProduto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_loja", nullable = false)
    private Loja loja;

    @Column(name = "imagem", nullable = false, length = 1000)
    private String imagem;

    @Column(name = "porcentagem_desconto", nullable = false)
    private Integer porcentagemDesconto = 0;

    @Column(name = "valor", nullable = false)
    private Integer valor = 0;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoMoedaEnum getTipoMoeda() {
        return tipoMoeda;
    }

    public void setTipoMoeda(TipoMoedaEnum tipoMoeda) {
        this.tipoMoeda = tipoMoeda;
    }

    public TipoProdutoEnum getTipoProduto() {
        return tipoProduto;
    }

    public void setTipoProduto(TipoProdutoEnum tipoProduto) {
        this.tipoProduto = tipoProduto;
    }

    public Loja getLoja() {
        return loja;
    }

    public void setLoja(Loja loja) {
        this.loja = loja;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public Integer getPorcentagemDesconto() {
        return porcentagemDesconto;
    }

    public void setPorcentagemDesconto(Integer porcentagemDesconto) {
        this.porcentagemDesconto = porcentagemDesconto;
    }

    public Integer getValor() {
        return valor;
    }

    public void setValor(Integer valor) {
        this.valor = valor;
    }
}

