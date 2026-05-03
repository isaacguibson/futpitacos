package com.guibsonsoftwares.futpitacos.model;
import jakarta.persistence.*;
import java.util.List;
@Entity
@Table(name = "produto", schema = "dbo")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false, length = 255)
    private String nome;

    @Column(name = "descricao", nullable = false, length = 255)
    private String descricao;

    @Column(name = "imagem", nullable = false, length = 1000)
    private String imagem;

    @Column(name = "porcentagem_desconto", nullable = false)
    private Integer porcentagemDesconto = 0;

    @Column(name = "valor", nullable = false)
    private Integer valor = 0;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ImagemProduto> imagens;

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
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
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
    public List<ImagemProduto> getImagens() {
        return imagens;
    }
    public void setImagens(List<ImagemProduto> imagens) {
        this.imagens = imagens;
    }
}
